"""视图路由

API 列表：
- GET  /                      首页（index.html）
- GET  /api/corners           角落列表（?city=）
- GET  /api/corners/<id>      角落详情
- GET  /api/concerts          演唱会列表（?city=）
- GET  /api/news              资讯列表
- GET  /api/cities            可用城市列表
- GET  /api/comments/<cid>    角落评论列表（含回复）
- POST /api/comments          发表评论/回复
- POST /api/comments/<id>/like 点赞/取消点赞
- GET  /api/footprints        打卡足迹
- POST /api/footprints        新增打卡
- GET  /api/passcode-logs     暗号记录
- POST /api/passcode-logs     核销暗号
- GET  /api/songs/unlocked    已解锁歌曲
- POST /api/songs/unlock      解锁歌曲
- GET  /api/quiz/result       最新测评结果
- POST /api/quiz/result       提交测评结果
- GET  /api/user/stat         用户统计
- PUT  /api/user/stat         更新统计（切城/分享等）
- GET  /api/tonight/<cid>     今晚同场留言
- POST /api/tonight/<cid>     发送今晚留言
"""
import uuid
from datetime import datetime
from flask import render_template, request
from app import app, db
from app.dao import *
from app.model import (Corner, Concert, News, Comment, Footprint, PasscodeLog,
                       SongUnlock, QuizResult, UserStat)
from app.response import make_succ_empty_response, make_succ_response, make_err_response

USER_ID = 'local_user'


# ---------- 页面 ----------
@app.route('/')
def index():
    return render_template('index.html')


# ---------- 角落 ----------
@app.route('/api/corners', methods=['GET'])
def get_corners():
    city = request.args.get('city', '')
    corners = query_corners_by_city(city)
    data = [corner_to_dict(c) for c in corners]
    return make_succ_response(data)


@app.route('/api/corners/<corner_id>', methods=['GET'])
def get_corner_detail(corner_id):
    c = query_corner_by_id(corner_id)
    if c is None:
        return make_err_response('角落不存在')
    return make_succ_response(corner_to_dict(c))


# ---------- 演唱会 ----------
@app.route('/api/concerts', methods=['GET'])
def get_concerts():
    city = request.args.get('city', '')
    concerts = query_concerts_by_city(city)
    data = [concert_to_dict(c) for c in concerts]
    return make_succ_response(data)


# ---------- 资讯 ----------
@app.route('/api/news', methods=['GET'])
def get_news():
    news = query_all_news()
    data = [{'id': n.id, 'title': n.title, 'summary': n.summary,
             'type': n.type, 'typeLabel': n.type_label, 'time': n.time} for n in news]
    return make_succ_response(data)


# ---------- 城市 ----------
@app.route('/api/cities', methods=['GET'])
def get_cities():
    cities = query_all_cities()
    return make_succ_response(cities)


# ---------- 评论 ----------
@app.route('/api/comments/<corner_id>', methods=['GET'])
def get_comments(corner_id):
    comments = query_comments_by_corner(corner_id)
    stat = get_or_create_user_stat(USER_ID)
    liked_ids = stat.liked_comment_ids if stat else []

    # 组装成树形结构：一级评论 + replies
    primary = [c for c in comments if not c.parent_id]
    replies_map = {}
    for r in comments:
        if r.parent_id:
            replies_map.setdefault(r.parent_id, []).append(r)

    data = []
    for c in primary:
        item = comment_to_dict(c, liked_ids)
        item['replies'] = [comment_to_dict(r, liked_ids) for r in replies_map.get(c.id, [])]
        data.append(item)
    return make_succ_response(data)


@app.route('/api/comments', methods=['POST'])
def post_comment():
    params = request.get_json()
    corner_id = params.get('cornerId')
    text = params.get('text', '').strip()
    parent_id = params.get('parentId')
    user = params.get('user', '五迷·同好')

    if not corner_id or not text:
        return make_err_response('缺少 cornerId 或 text')

    # 50 条上限归档
    existing = query_comments_by_corner(corner_id)
    primary_count = sum(1 for c in existing if not c.parent_id)
    if primary_count >= 50 and not parent_id:
        return make_err_response('评论数已达上限')

    cmt = Comment(
        id='cmt_' + uuid.uuid4().hex[:12],
        corner_id=corner_id,
        parent_id=parent_id,
        user=user,
        text=text,
        time=datetime.now().strftime('%Y-%m-%d %H:%M'),
        likes=0
    )
    insert_comment(cmt)
    stat = get_or_create_user_stat(USER_ID)
    return make_succ_response(comment_to_dict(cmt, stat.liked_comment_ids if stat else []))


@app.route('/api/comments/<comment_id>/like', methods=['POST'])
def toggle_like(comment_id):
    cmt = Comment.query.filter(Comment.id == comment_id).first()
    if cmt is None:
        return make_err_response('评论不存在')

    stat = get_or_create_user_stat(USER_ID)
    if stat is None:
        return make_err_response('用户状态异常')

    liked_ids = stat.liked_comment_ids or []
    if comment_id in liked_ids:
        liked_ids.remove(comment_id)
        cmt.likes = max(0, cmt.likes - 1)
        stat.comment_liked_count = max(0, (stat.comment_liked_count or 0) - 1)
    else:
        liked_ids.append(comment_id)
        cmt.likes = (cmt.likes or 0) + 1
        stat.comment_liked_count = (stat.comment_liked_count or 0) + 1
    stat.liked_comment_ids = liked_ids
    db.session.commit()
    return make_succ_response({'likes': cmt.likes, 'liked': comment_id in liked_ids})


# ---------- 打卡足迹 ----------
@app.route('/api/footprints', methods=['GET'])
def get_footprints():
    fps = query_footprints(USER_ID)
    data = [{'id': fp.id, 'cornerId': fp.corner_id, 'cornerName': fp.corner_name,
             'city': fp.city, 'mode': fp.mode, 'tpl': fp.tpl,
             'time': fp.created_at.strftime('%Y-%m-%d %H:%M')} for fp in fps]
    return make_succ_response(data)


@app.route('/api/footprints', methods=['POST'])
def post_footprint():
    params = request.get_json()
    corner = query_corner_by_id(params.get('cornerId'))
    if corner is None:
        return make_err_response('角落不存在')

    fp = Footprint(
        user_id=USER_ID,
        corner_id=corner.id,
        corner_name=corner.name,
        city=corner.city,
        mode=params.get('mode', 'strict'),
        tpl=params.get('tpl', 'polaroid'),
        photo=params.get('photo', '')
    )
    insert_footprint(fp)
    return make_succ_response({'id': fp.id, 'cornerName': corner.name, 'city': corner.city})


# ---------- 暗号 ----------
@app.route('/api/passcode-logs', methods=['GET'])
def get_passcode_logs():
    logs = query_passcode_logs(USER_ID)
    data = [{'id': l.id, 'cornerId': l.corner_id, 'cornerName': l.corner_name,
             'passcode': l.passcode, 'song': l.song,
             'time': l.created_at.strftime('%Y-%m-%d %H:%M')} for l in logs]
    return make_succ_response(data)


@app.route('/api/passcode-logs', methods=['POST'])
def post_passcode_log():
    params = request.get_json()
    corner_id = params.get('cornerId')
    passcode = params.get('passcode', '').strip()
    corner = query_corner_by_id(corner_id)
    if corner is None:
        return make_err_response('角落不存在')
    if passcode != corner.passcode:
        return make_err_response('暗号错误')

    log = PasscodeLog(
        user_id=USER_ID,
        corner_id=corner.id,
        corner_name=corner.name,
        passcode=passcode,
        song=corner.song
    )
    insert_passcode_log(log)
    return make_succ_response({'cornerName': corner.name, 'song': corner.song,
                               'passcode': passcode})


# ---------- 歌单解锁 ----------
@app.route('/api/songs/unlocked', methods=['GET'])
def get_unlocked_songs():
    rows = query_unlocked_songs(USER_ID)
    data = [{'song': r.song, 'unlockAction': r.unlock_action,
             'time': r.created_at.strftime('%Y-%m-%d %H:%M')} for r in rows]
    return make_succ_response(data)


@app.route('/api/songs/unlock', methods=['POST'])
def unlock_song():
    params = request.get_json()
    song = params.get('song', '').strip()
    action = params.get('action', 'manual')
    if not song:
        return make_err_response('缺少 song')

    existing = SongUnlock.query.filter(
        SongUnlock.user_id == USER_ID, SongUnlock.song == song).first()
    if existing is None:
        su = SongUnlock(user_id=USER_ID, song=song, unlock_action=action)
        insert_song_unlock(su)
    return make_succ_response({'song': song, 'unlocked': True})


# ---------- 测评 ----------
@app.route('/api/quiz/result', methods=['GET'])
def get_quiz_result():
    r = query_latest_quiz_result(USER_ID)
    if r is None:
        return make_succ_response(None)
    return make_succ_response({'type': r.result_type, 'song': r.song,
                               'personality': r.personality,
                               'date': r.created_at.strftime('%Y-%m-%d')})


@app.route('/api/quiz/result', methods=['POST'])
def post_quiz_result():
    params = request.get_json()
    result_type = params.get('type')
    song = params.get('song')
    personality = params.get('personality')
    answers = params.get('answers')

    if not result_type or not song:
        return make_err_response('缺少 type 或 song')

    r = QuizResult(user_id=USER_ID, result_type=result_type, song=song,
                   personality=personality, answers=answers)
    insert_quiz_result(r)

    # 解锁测评相关歌曲
    existing = SongUnlock.query.filter(
        SongUnlock.user_id == USER_ID, SongUnlock.song == song).first()
    if existing is None:
        su = SongUnlock(user_id=USER_ID, song=song, unlock_action='quiz')
        insert_song_unlock(su)
    return make_succ_response({'type': result_type, 'song': song, 'personality': personality})


# ---------- 用户统计 ----------
@app.route('/api/user/stat', methods=['GET'])
def get_user_stat():
    stat = get_or_create_user_stat(USER_ID)
    if stat is None:
        return make_err_response('用户状态异常')
    return make_succ_response(user_stat_to_dict(stat))


@app.route('/api/user/stat', methods=['PUT'])
def update_user_stat_api():
    params = request.get_json()
    stat = get_or_create_user_stat(USER_ID)
    if stat is None:
        return make_err_response('用户状态异常')

    if 'currentCity' in params:
        stat.current_city = params['currentCity']
    if 'citySwitchCount' in params:
        stat.city_switch_count = params['citySwitchCount']
    if 'shareCount' in params:
        stat.share_count = params['shareCount']
    if 'commentLikedCount' in params:
        stat.comment_liked_count = params['commentLikedCount']
    db.session.commit()
    return make_succ_response(user_stat_to_dict(stat))


# ---------- 今晚同场留言 ----------
@app.route('/api/tonight/<concert_id>', methods=['GET'])
def get_tonight_msgs(concert_id):
    # 复用 Comment 表，corner_id 存 concert_id，parent_id 为空
    comments = Comment.query.filter(Comment.corner_id == concert_id).order_by(
        Comment.created_at.desc()).limit(50).all()
    data = [{'id': c.id, 'user': c.user, 'text': c.text,
             'time': c.time, 'likes': c.likes} for c in comments]
    return make_succ_response(data)


@app.route('/api/tonight/<concert_id>', methods=['POST'])
def post_tonight_msg(concert_id):
    params = request.get_json()
    text = params.get('text', '').strip()
    user = params.get('user', '五迷·同好')
    if not text:
        return make_err_response('内容不能为空')
    if len(text) > 200:
        return make_err_response('内容不能超过 200 字')

    cmt = Comment(
        id='tonight_' + uuid.uuid4().hex[:12],
        corner_id=concert_id,
        user=user,
        text=text,
        time=datetime.now().strftime('%Y-%m-%d %H:%M'),
        likes=0
    )
    insert_comment(cmt)
    return make_succ_response({'id': cmt.id, 'user': cmt.user, 'text': cmt.text,
                               'time': cmt.time, 'likes': 0})


# ---------- 序列化函数 ----------
def corner_to_dict(c):
    return {
        'id': c.id, 'name': c.name, 'city': c.city, 'address': c.address,
        'categoryLabel': c.category_label, 'imageId': c.image_id,
        'lyric': c.lyric, 'song': c.song, 'lyricCredit': c.lyric_credit,
        'passcode': c.passcode, 'recommend': c.recommend,
        'likes': c.likes, 'notes': c.notes, 'distanceText': c.distance_text,
        'moodTags': c.mood_tags or [], 'lat': c.lat, 'lng': c.lng,
        'description': c.description, 'openingHours': c.opening_hours,
        'phone': c.phone, 'tags': c.tags or [], 'tips': c.tips
    }


def concert_to_dict(c):
    return {
        'id': c.id, 'city': c.city, 'venue': c.venue, 'dateText': c.date_text,
        'status': c.status, 'statusLabel': c.status_label,
        'posterId': c.poster_id, 'highlight': c.highlight,
        'lat': c.lat, 'lng': c.lng,
        'concertDate': c.concert_date.strftime('%Y-%m-%d') if c.concert_date else None
    }


def comment_to_dict(c, liked_ids=None):
    liked_ids = liked_ids or []
    return {
        'id': c.id, 'cornerId': c.corner_id, 'parentId': c.parent_id,
        'user': c.user, 'text': c.text, 'time': c.time,
        'likes': c.likes, 'liked': c.id in liked_ids,
        'replies': []
    }


def user_stat_to_dict(stat):
    return {
        'likedCommentIds': stat.liked_comment_ids or [],
        'shareCount': stat.share_count or 0,
        'citySwitchCount': stat.city_switch_count or 0,
        'currentCity': stat.current_city or '北京',
        'commentLikedCount': stat.comment_liked_count or 0
    }
