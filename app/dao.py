"""数据访问层

封装各表的查询/插入/更新/删除操作。
"""
import logging
from sqlalchemy.exc import OperationalError
from app import db
from app.model import (Corner, Concert, News, Comment, Footprint, PasscodeLog,
                       SongUnlock, QuizResult, UserStat)

logger = logging.getLogger('log')

USER_ID = 'local_user'


# ---------- Corner ----------
def query_corners_by_city(city):
    try:
        q = Corner.query
        if city and city != '全部':
            q = q.filter(Corner.city == city)
        return q.order_by(Corner.likes.desc()).all()
    except OperationalError as e:
        logger.info("query_corners_by_city errorMsg= {} ".format(e))
        return []


def query_corner_by_id(corner_id):
    try:
        return Corner.query.filter(Corner.id == corner_id).first()
    except OperationalError as e:
        logger.info("query_corner_by_id errorMsg= {} ".format(e))
        return None


def query_all_cities():
    try:
        results = db.session.query(Corner.city).distinct().all()
        return [r[0] for r in results]
    except OperationalError as e:
        logger.info("query_all_cities errorMsg= {} ".format(e))
        return []


# ---------- Concert ----------
def query_concerts_by_city(city):
    try:
        q = Concert.query
        if city and city != '全部':
            q = q.filter(Concert.city == city)
        return q.order_by(Concert.concert_date.asc()).all()
    except OperationalError as e:
        logger.info("query_concerts_by_city errorMsg= {} ".format(e))
        return []


# ---------- News ----------
def query_all_news():
    try:
        return News.query.order_by(News.created_at.desc()).all()
    except OperationalError as e:
        logger.info("query_all_news errorMsg= {} ".format(e))
        return []


# ---------- Comment ----------
def query_comments_by_corner(corner_id):
    try:
        return Comment.query.filter(Comment.corner_id == corner_id).order_by(Comment.created_at.desc()).all()
    except OperationalError as e:
        logger.info("query_comments_by_corner errorMsg= {} ".format(e))
        return []


def insert_comment(comment):
    try:
        db.session.add(comment)
        db.session.commit()
    except OperationalError as e:
        logger.info("insert_comment errorMsg= {} ".format(e))


def update_comment_likes(comment_id, likes):
    try:
        c = Comment.query.filter(Comment.id == comment_id).first()
        if c:
            c.likes = likes
            db.session.commit()
    except OperationalError as e:
        logger.info("update_comment_likes errorMsg= {} ".format(e))


# ---------- Footprint ----------
def query_footprints(user_id=USER_ID):
    try:
        return Footprint.query.filter(Footprint.user_id == user_id).order_by(Footprint.created_at.desc()).all()
    except OperationalError as e:
        logger.info("query_footprints errorMsg= {} ".format(e))
        return []


def insert_footprint(fp):
    try:
        db.session.add(fp)
        db.session.commit()
    except OperationalError as e:
        logger.info("insert_footprint errorMsg= {} ".format(e))


# ---------- PasscodeLog ----------
def query_passcode_logs(user_id=USER_ID):
    try:
        return PasscodeLog.query.filter(PasscodeLog.user_id == user_id).all()
    except OperationalError as e:
        logger.info("query_passcode_logs errorMsg= {} ".format(e))
        return []


def insert_passcode_log(log):
    try:
        db.session.add(log)
        db.session.commit()
    except OperationalError as e:
        logger.info("insert_passcode_log errorMsg= {} ".format(e))


# ---------- SongUnlock ----------
def query_unlocked_songs(user_id=USER_ID):
    try:
        return SongUnlock.query.filter(SongUnlock.user_id == user_id).all()
    except OperationalError as e:
        logger.info("query_unlocked_songs errorMsg= {} ".format(e))
        return []


def insert_song_unlock(song_unlock):
    try:
        db.session.add(song_unlock)
        db.session.commit()
    except OperationalError as e:
        logger.info("insert_song_unlock errorMsg= {} ".format(e))


# ---------- QuizResult ----------
def query_latest_quiz_result(user_id=USER_ID):
    try:
        return QuizResult.query.filter(QuizResult.user_id == user_id).order_by(
            QuizResult.created_at.desc()).first()
    except OperationalError as e:
        logger.info("query_latest_quiz_result errorMsg= {} ".format(e))
        return None


def insert_quiz_result(result):
    try:
        db.session.add(result)
        db.session.commit()
    except OperationalError as e:
        logger.info("insert_quiz_result errorMsg= {} ".format(e))


# ---------- UserStat ----------
def get_or_create_user_stat(user_id=USER_ID):
    try:
        stat = UserStat.query.filter(UserStat.user_id == user_id).first()
        if stat is None:
            stat = UserStat(user_id=user_id, liked_comment_ids=[],
                            share_count=0, city_switch_count=0,
                            current_city='北京', comment_liked_count=0)
            db.session.add(stat)
            db.session.commit()
        return stat
    except OperationalError as e:
        logger.info("get_or_create_user_stat errorMsg= {} ".format(e))
        return None


def update_user_stat(stat):
    try:
        db.session.commit()
    except OperationalError as e:
        logger.info("update_user_stat errorMsg= {} ".format(e))
