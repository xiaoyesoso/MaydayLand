"""MaydayLand 数据模型

对应前端 html-demo 的数据结构：
- Corner: 歌词角落
- Concert: 演唱会
- News: 资讯动态
- Badge: 徽章
- Comment: 评论（含二级回复）
- Footprint: 打卡足迹
- PasscodeLog: 暗号核销记录
- SongUnlock: 歌单解锁
- QuizResult: 人格测评结果
- UserStat: 用户统计（点赞/分享/切城计数）
"""
from datetime import datetime
from app import db

# MySQL 严格模式下 TIMESTAMP 列需要数据库端默认值
_TS_DEFAULT = db.text('CURRENT_TIMESTAMP')
_TS_UPDATE = db.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')


class Corner(db.Model):
    """歌词角落"""
    __tablename__ = 'Corner'

    id = db.Column(db.String(32), primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    city = db.Column(db.String(16), nullable=False, index=True)
    address = db.Column(db.String(128), nullable=False)
    category_label = db.Column('categoryLabel', db.String(32))
    image_id = db.Column('imageId', db.Integer)
    lyric = db.Column(db.String(256))
    song = db.Column(db.String(64))
    lyric_credit = db.Column('lyricCredit', db.String(256))
    passcode = db.Column(db.String(64))
    recommend = db.Column(db.String(512))
    likes = db.Column(db.Integer, default=0)
    notes = db.Column(db.Integer, default=0)
    distance_text = db.Column('distanceText', db.String(64))
    mood_tags = db.Column('moodTags', db.JSON)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    description = db.Column(db.Text)
    opening_hours = db.Column('openingHours', db.String(64))
    phone = db.Column(db.String(32))
    tags = db.Column(db.JSON)
    tips = db.Column(db.Text)
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)
    updated_at = db.Column('updatedAt', db.TIMESTAMP, nullable=False, server_default=_TS_UPDATE)


class Concert(db.Model):
    """演唱会"""
    __tablename__ = 'Concert'

    id = db.Column(db.String(32), primary_key=True)
    city = db.Column(db.String(16), nullable=False, index=True)
    venue = db.Column(db.String(64), nullable=False)
    date_text = db.Column('dateText', db.String(128))
    status = db.Column(db.String(16))
    status_label = db.Column('statusLabel', db.String(16))
    poster_id = db.Column('posterId', db.Integer)
    highlight = db.Column(db.Text)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    concert_date = db.Column('concertDate', db.Date)
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)


class News(db.Model):
    """资讯动态"""
    __tablename__ = 'News'

    id = db.Column(db.String(32), primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    summary = db.Column(db.Text)
    type = db.Column(db.String(16))
    type_label = db.Column('typeLabel', db.String(16))
    time = db.Column(db.String(32))
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)


class Comment(db.Model):
    """评论（支持二级回复）

    parent_id 为空表示一级评论，非空表示对某条评论的回复。
    """
    __tablename__ = 'Comment'

    id = db.Column(db.String(32), primary_key=True)
    corner_id = db.Column('cornerId', db.String(32), nullable=False, index=True)
    parent_id = db.Column('parentId', db.String(32), index=True)
    user = db.Column(db.String(32), nullable=False)
    text = db.Column(db.Text, nullable=False)
    time = db.Column(db.String(32))
    likes = db.Column(db.Integer, default=0)
    is_seed = db.Column('isSeed', db.Boolean, default=False)
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)


class Footprint(db.Model):
    """打卡足迹"""
    __tablename__ = 'Footprint'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column('userId', db.String(32), default='local_user')
    corner_id = db.Column('cornerId', db.String(32), nullable=False, index=True)
    corner_name = db.Column('cornerName', db.String(64))
    city = db.Column(db.String(16), index=True)
    mode = db.Column(db.String(16))  # strict / loose
    tpl = db.Column(db.String(16))  # polaroid / ticket / postcard
    photo = db.Column(db.Text)
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)


class PasscodeLog(db.Model):
    """暗号核销记录"""
    __tablename__ = 'PasscodeLog'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column('userId', db.String(32), default='local_user')
    corner_id = db.Column('cornerId', db.String(32), nullable=False, index=True)
    corner_name = db.Column('cornerName', db.String(64))
    passcode = db.Column(db.String(64))
    song = db.Column(db.String(64))
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)


class SongUnlock(db.Model):
    """歌单解锁记录"""
    __tablename__ = 'SongUnlock'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column('userId', db.String(32), default='local_user')
    song = db.Column(db.String(64), nullable=False, index=True)
    unlock_action = db.Column('unlockAction', db.String(32))
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)


class QuizResult(db.Model):
    """人格测评结果"""
    __tablename__ = 'QuizResult'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column('userId', db.String(32), default='local_user')
    result_type = db.Column('resultType', db.String(4), nullable=False)
    song = db.Column(db.String(64), nullable=False)
    personality = db.Column(db.String(32), nullable=False)
    answers = db.Column(db.JSON)
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)


class UserStat(db.Model):
    """用户统计（点赞/分享/切城计数）"""
    __tablename__ = 'UserStat'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column('userId', db.String(32), default='local_user', unique=True)
    liked_comment_ids = db.Column('likedCommentIds', db.JSON)  # 点赞过的评论 id 列表
    share_count = db.Column('shareCount', db.Integer, default=0)
    city_switch_count = db.Column('citySwitchCount', db.Integer, default=0)
    current_city = db.Column('currentCity', db.String(16), default='北京')
    comment_liked_count = db.Column('commentLikedCount', db.Integer, default=0)
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, server_default=_TS_DEFAULT)
    updated_at = db.Column('updatedAt', db.TIMESTAMP, nullable=False, server_default=_TS_UPDATE)
