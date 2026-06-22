"""种子数据初始化

运行 `python seed.py` 即可把 html-demo 的种子数据导入数据库。
包含：12 个角落、4 场演唱会、5 条资讯、6 条种子评论。
"""
from datetime import datetime
from app import app, db
from app.model import Corner, Concert, News, Comment


def _parse_date(s):
    """把 'YYYY-MM-DD' 字符串转成 date 对象，失败返回 None"""
    if not s:
        return None
    try:
        return datetime.strptime(s, '%Y-%m-%d').date()
    except (ValueError, TypeError):
        return None


CORNERS = [
    {'id': 'corner_001', 'name': '明园餐厅', 'city': '北京', 'address': '东城区北总布胡同 21 号',
     'categoryLabel': '五迷同款', 'imageId': 431, 'lyric': '一碗炸酱面 吃出了整个老北京',
     'song': '任意门', 'lyricCredit': '玛莎 2026 鸟巢演唱会期间同款', 'passcode': '玛莎同款',
     'recommend': '演唱会期间排队超 100 号，炸酱面、焦熘丸子必点', 'likes': 315, 'notes': 67,
     'distanceText': '距鸟巢 4.2km', 'moodTags': ['同款', '地道', '烟火气'],
     'lat': 39.9042, 'lng': 116.4074,
     'description': '藏在北总布胡同里的老北京家常菜馆，玛莎鸟巢演唱会期间被五迷发现并疯狂打卡。老板是地道北京人，炸酱面配方传了三代，焦熘丸子外酥里嫩。墙上贴满了五迷留下的合影和便利贴，是演唱会前后"续场"的热门据点。',
     'openingHours': '11:00-21:00', 'phone': '010-6523XXXX',
     'tags': ['复古', '胡同', '烟火气', '五迷同款'],
     'tips': '演唱会期间建议提前 1 小时到店，对暗号"玛莎同款"可获赠酸梅汤一杯'},
    {'id': 'corner_002', 'name': '北外滩歌词地贴步道', 'city': '上海', 'address': '北外滩滨江绿地',
     'categoryLabel': '打卡地', 'imageId': 1080, 'lyric': '外滩风光 跃出课本 是那么新鲜',
     'song': '任意门', 'lyricCredit': '2025 上海 MAYDAYLAND 官方打卡点', 'passcode': '任意门',
     'recommend': '五公仔人偶 + 歌词地贴，背景是浦东陆家嘴', 'likes': 186, 'notes': 28,
     'distanceText': '距上海体育场 5.1km', 'moodTags': ['地标', '浪漫', '夜景'],
     'lat': 31.2450, 'lng': 121.4900,
     'description': '2025 上海站 MAYDAYLAND 官方设置的歌词地贴步道，沿北外滩滨江延伸 500 米，每一步都踩着五月天的金句。五公仔人偶错落分布，背景是浦东陆家嘴天际线，日落与夜景皆可出片。',
     'openingHours': '全天开放', 'phone': '无',
     'tags': ['地标', '浪漫', '夜景', '官方'],
     'tips': '日落前 1 小时最佳光线，周末人较多建议工作日前往'},
    {'id': 'corner_003', 'name': '西单更新场 STAYREAL PARK', 'city': '北京', 'address': '西城区西单北大街 180 号',
     'categoryLabel': '快闪店', 'imageId': 250, 'lyric': '给我抱抱 把爱传出去',
     'song': '拥抱', 'lyricCredit': 'STAYREAL PARK 4.0 拥抱公园主题', 'passcode': '给我抱抱',
     'recommend': '7.4 米纯真兔、6 米胡萝卜、京味漫游限定周边', 'likes': 238, 'notes': 42,
     'distanceText': '距鸟巢 9.8km', 'moodTags': ['治愈', '潮玩', '限定'],
     'lat': 39.9090, 'lng': 116.3730,
     'description': 'STAYREAL PARK 4.0「拥抱公园」主题快闪，7.4 米纯真兔坐镇中庭，6 米胡萝卜装置可互动。京味漫游限定周边仅此一站有售，包括胡同元素卜卜 Tee、京剧脸谱公仔等。',
     'openingHours': '10:00-22:00', 'phone': '010-6655XXXX',
     'tags': ['潮玩', '限定', '治愈', '快闪'],
     'tips': '限定周边库存有限，建议开馆即入手；对暗号享 9 折'},
    {'id': 'corner_004', 'name': '水立方 MOJO EXPO', 'city': '北京', 'address': '朝阳区天辰东路 11 号',
     'categoryLabel': '展览', 'imageId': 292, 'lyric': '真正的人生梦想 在你的手上',
     'song': '倔强', 'lyricCredit': '2026 鸟巢演唱会期间限定装置', 'passcode': '梦想卜览',
     'recommend': '33 米巨型胡萝卜麦克风，吉尼斯世界纪录认证', 'likes': 421, 'notes': 89,
     'distanceText': '距鸟巢 0.5km', 'moodTags': ['梦想', '震撼', '打卡'],
     'lat': 39.9930, 'lng': 116.3970,
     'description': '鸟巢演唱会期间限定开放的 MOJO EXPO，33 米巨型胡萝卜麦克风获吉尼斯世界纪录认证。馆内设五大沉浸式展区，从「无名高地」到「鸟巢 55 场」完整回顾五月天 25 年历程，出口处可盖限定纪念章。',
     'openingHours': '09:00-21:00', 'phone': '010-8437XXXX',
     'tags': ['展览', '震撼', '限定', '吉尼斯'],
     'tips': '凭演唱会门票可免预约入场，出口纪念章仅限当日盖'},
    {'id': 'corner_005', 'name': 'THE BOX 朝外 MAYDAYLAND', 'city': '北京', 'address': '朝阳区朝阳门外大街 10 号 B 馆 L3',
     'categoryLabel': '特展', 'imageId': 1015, 'lyric': '从无名高地到鸟巢的 10 年',
     'song': '任意门', 'lyricCredit': '2026 北京限定特展官方文案', 'passcode': '回到那一天',
     'recommend': '4/25-5/19 限定展，需凭演唱会门票预约', 'likes': 567, 'notes': 134,
     'distanceText': '距鸟巢 8.6km', 'moodTags': ['展览', '限定', '回忆'],
     'lat': 39.9230, 'lng': 116.4480,
     'description': '2026 北京限定特展，4/25-5/19 仅 25 天。以「从无名高地到鸟巢的 10 年」为主线，展出历年演唱会舞台模型、阿信手稿复刻、五人乐器 1:1 还原。需凭演唱会门票预约，每日限流 800 人。',
     'openingHours': '10:00-22:00', 'phone': '010-8562XXXX',
     'tags': ['展览', '限定', '回忆', '预约'],
     'tips': '必须提前在 MaydayLand 小程序预约，每日 800 人满即止'},
    {'id': 'corner_006', 'name': '东方明珠 MAYDAYLAND', 'city': '上海', 'address': '浦东新区世纪大道 1 号',
     'categoryLabel': '打卡地', 'imageId': 119, 'lyric': '因为你 所以我 爱上那片天空',
     'song': '因为你 所以我', 'lyricCredit': '2025 上海站「MAYDAYLAND 东方明珠指挥总部」', 'passcode': '因为你所以五',
     'recommend': '5.025 米 SUPER MAYDAY MAX 乐高机甲 + 喵星人装置', 'likes': 198, 'notes': 31,
     'distanceText': '距上海体育场 6.3km', 'moodTags': ['地标', '科技感', '合影'],
     'lat': 31.2397, 'lng': 121.4998,
     'description': '2025 上海站「MAYDAYLAND 东方明珠指挥总部」遗址，5.025 米 SUPER MAYDAY MAX 乐高机甲永久保留。喵星人装置与东方明珠塔同框，是上海五迷的"朝圣点"。塔下广场设有歌词投影，每晚 19:00/20:00 各一场。',
     'openingHours': '全天开放（投影 19:00/20:00）', 'phone': '021-5879XXXX',
     'tags': ['地标', '科技感', '合影', '夜景'],
     'tips': '乐高机甲夜间有灯光秀，投影时段提前 15 分钟到场占位'},
    {'id': 'corner_007', 'name': '长沙 IFS 卜卜花园', 'city': '长沙', 'address': '芙蓉区解放西路 188 号',
     'categoryLabel': '首展', 'imageId': 326, 'lyric': '绽放星城 一起拥抱',
     'song': '拥抱', 'lyricCredit': 'MOJO IN BLOOM 全国首展 2026.05.23', 'passcode': 'MOJO IN BLOOM',
     'recommend': '11 米长沙限定卜卜全球首展，三大沉浸式展区', 'likes': 287, 'notes': 56,
     'distanceText': '市中心', 'moodTags': ['首展', '卜卜', '治愈'],
     'lat': 28.1970, 'lng': 112.9750,
     'description': 'STAYREAL MOJO IN BLOOM 全国首展，11 米长沙限定卜卜全球首次亮相。三大沉浸式展区：花海迷宫、卜卜咖啡馆、限定周边店。长沙限定口味「臭豆腐卜卜」周边仅此有售。',
     'openingHours': '10:00-22:00', 'phone': '0731-8488XXXX',
     'tags': ['首展', '卜卜', '治愈', '限定'],
     'tips': '工作日 14:00 后人少，臭豆腐卜卜周边每日限量 50 个'},
    {'id': 'corner_008', 'name': '钟鼓楼广场 怪兽公仔', 'city': '北京', 'address': '东城区钟鼓楼广场',
     'categoryLabel': '公仔点', 'imageId': 1018, 'lyric': '我和我最后的倔强 握紧双手绝对不放',
     'song': '倔强', 'lyricCredit': '北京旅游集散中心「五迷专属打卡巴士」首站', 'passcode': '倔强',
     'recommend': '官方打卡观光巴士起点，串联五大成员公仔点位', 'likes': 142, 'notes': 19,
     'distanceText': '距鸟巢 7.5km', 'moodTags': ['倔强', '城市漫游', '官方'],
     'lat': 39.9410, 'lng': 116.3970,
     'description': '北京旅游集散中心推出的「五迷专属打卡巴士」首站，怪兽公仔坐镇钟鼓楼广场。巴士串联五大成员公仔点位（钟鼓楼/首钢园/朝阳公园/居庸关/鸟巢），全程约 4 小时，含讲解。',
     'openingHours': '巴士 09:00/13:00 两班', 'phone': '010-8401XXXX',
     'tags': ['倔强', '城市漫游', '官方', '巴士'],
     'tips': '巴士需提前 1 天预约，凭 MaydayLand 打卡记录享 8 折'},
    {'id': 'corner_009', 'name': '首钢园 石头公仔', 'city': '北京', 'address': '石景山区石景山路 68 号',
     'categoryLabel': '公仔点', 'imageId': 1036, 'lyric': '然后呢 一起走吧',
     'song': '后青春期的诗', 'lyricCredit': '首钢园沉淀池广场限定装置', 'passcode': '一起走吧',
     'recommend': '工业风背景 + 石头公仔，日落时分最出片', 'likes': 632, 'notes': 156,
     'distanceText': '距鸟巢 12km', 'moodTags': ['工业风', '日落', '出片'],
     'lat': 39.9250, 'lng': 116.1750,
     'description': '首钢园沉淀池广场的石头公仔，背靠工业遗迹高炉，硬核工业风与治愈公仔形成强烈反差。日落时分金色光线打在高炉上，是北京五迷公认的"最出片"打卡点。园区免费开放，可骑行游览。',
     'openingHours': '全天开放', 'phone': '010-8829XXXX',
     'tags': ['工业风', '日落', '出片', '免费'],
     'tips': '日落前 40 分钟到达最佳，园区内可租共享单车'},
    {'id': 'corner_010', 'name': '朝阳公园五色大球', 'city': '北京', 'address': '朝阳区朝阳公园南路 1 号',
     'categoryLabel': '应援点', 'imageId': 1044, 'lyric': '天空和我的中间 只剩倾盆的思念',
     'song': '步步', 'lyricCredit': '2026 鸟巢演唱会期间五大球巨型气膜回归', 'passcode': '五月天',
     'recommend': '五大球巨型气膜 + 好运桥《星空》光影秀', 'likes': 389, 'notes': 78,
     'distanceText': '距鸟巢 6.8km', 'moodTags': ['应援', '夜景', '五大球'],
     'lat': 39.9430, 'lng': 116.4780,
     'description': '2026 鸟巢演唱会期间回归的五大球巨型气膜，蓝粉黄绿紫五色对应五位成员。夜晚 19:00-22:00 灯光秀，配合好运桥《星空》光影步道，是演唱会前后最热闹的五迷聚集地。',
     'openingHours': '气膜 09:00-22:00', 'phone': '010-6595XXXX',
     'tags': ['应援', '夜景', '五大球', '光影'],
     'tips': '灯光秀整点开始，好运桥步道限流建议 18:30 排队'},
    {'id': 'corner_011', 'name': '居庸关长城 阿信公仔', 'city': '北京', 'address': '昌平区居庸关长城',
     'categoryLabel': '公仔点', 'imageId': 1082, 'lyric': '不到长城非好汉',
     'song': '离开地球表面', 'lyricCredit': '北京旅游集散中心官方打卡巴士线路三', 'passcode': '离开地球表面',
     'recommend': '官方「痛车」巴士可达，长城 + 阿信公仔同框', 'likes': 478, 'notes': 92,
     'distanceText': '距鸟巢 45km', 'moodTags': ['长城', '官方', '壮观'],
     'lat': 40.2910, 'lng': 116.0710,
     'description': '北京旅游集散中心官方打卡巴士线路三终点，阿信公仔立于居庸关长城烽火台。官方「痛车」巴士车身印满五月天元素，从鸟巢出发约 1.5 小时。长城 + 阿信同框，是"不到长城非好汉"的五迷版诠释。',
     'openingHours': '巴士 08:00 单班', 'phone': '010-8401XXXX',
     'tags': ['长城', '官方', '壮观', '痛车'],
     'tips': '巴士仅 08:00 一班，返程 15:00，需带身份证购票'},
    {'id': 'corner_012', 'name': '阿信同款烧饼店', 'city': '北京', 'address': '东城区某胡同（凭暗号解锁地址）',
     'categoryLabel': '五迷同款', 'imageId': 580, 'lyric': '就算失望 不能绝望',
     'song': '倔强', 'lyricCredit': '阿信早年社交平台分享的老北京烧饼', 'passcode': '不能绝望',
     'recommend': '阿信随手分享后成为五迷隐藏打卡点，价格实惠馅扎实', 'likes': 92, 'notes': 11,
     'distanceText': '距鸟巢 6.5km', 'moodTags': ['同款', '隐藏', '烟火气'],
     'lat': 39.8900, 'lng': 116.4300,
     'description': '阿信早年社交平台随手分享的老北京烧饼店，被五迷考古后成为隐藏打卡点。地址需对暗号"不能绝望"才告知，保护店家日常生意。烧饼 5 元一个，馅料扎实，是"就算失望不能绝望"的烟火气注脚。',
     'openingHours': '06:00-11:00（售完即止）', 'phone': '凭暗号解锁',
     'tags': ['同款', '隐藏', '烟火气', '平价'],
     'tips': '营业时间极短，建议早 7 点前到，对暗号后老板会画地图'},
]

CONCERTS = [
    {'id': 'c001', 'city': '北京', 'venue': '国家体育场（鸟巢）',
     'dateText': '2026.04.30 - 05.18', 'status': 'ended', 'statusLabel': '已收官',
     'posterId': 1015,
     'highlight': '5525+2 回到那一天 · 连开 12 场累计 55 场鸟巢演出，刷新华语乐团纪录。场馆周边五迷角落密集，水立方胡萝卜麦克风仅 0.5km。',
     'lat': 39.9920, 'lng': 116.3970, 'concertDate': '2026-05-18'},
    {'id': 'c002', 'city': '台北', 'venue': '台北大巨蛋',
     'dateText': '2026.07.03 / 04 / 05 / 08 / 10 / 11 / 12', 'status': 'upcoming',
     'statusLabel': '即将开演', 'posterId': 1018,
     'highlight': '五月天重返台北大巨蛋，7 场连唱。5/23 拓元售票已启动，周三/五 19:00、周六/日 18:30 开演。',
     'lat': 25.0597, 'lng': 121.5500, 'concertDate': '2026-07-03'},
    {'id': 'c003', 'city': '长沙', 'venue': '长沙 IFS',
     'dateText': '2026.05.23 起', 'status': 'upcoming', 'statusLabel': '即将开演',
     'posterId': 1044,
     'highlight': 'STAYREAL MOJO IN BLOOM 全国首展，11 米长沙限定卜卜全球首展，三大沉浸式展区。',
     'lat': 28.1970, 'lng': 112.9750, 'concertDate': '2026-05-23'},
    {'id': 'c004', 'city': '上海', 'venue': '上海体育场',
     'dateText': '2026 夏（待官宣）', 'status': 'upcoming', 'statusLabel': '待官宣',
     'posterId': 1036,
     'highlight': '2025 上海站 MAYDAYLAND 东方明珠指挥总部大获成功，2026 夏季有望回归，北外滩歌词地贴步道持续开放。',
     'lat': 31.1880, 'lng': 121.4370, 'concertDate': '2026-07-15'},
]

NEWS = [
    {'id': 'n001', 'title': '鸟巢 12 场收官创纪录',
     'summary': '五月天「5525+2 回到那一天」北京鸟巢站 4/30-5/18 连开 12 场，累计 55 场鸟巢演出刷新华语乐团纪录',
     'type': 'news', 'typeLabel': '资讯', 'time': '今天 09:24'},
    {'id': 'n002', 'title': '台北站重回大巨蛋 7/3 起开唱',
     'summary': '台北大巨蛋 7/3、4、5、8、10、11、12 共七场，5/23 拓元售票已启动，周三/五 19:00、周六/日 18:30 开演',
     'type': 'ticket', 'typeLabel': '票务', 'time': '昨天 18:02'},
    {'id': 'n003', 'title': 'STAYREAL PARK 4.0 北京西单更新场',
     'summary': '五一期间西单更新场单日客流破 7 万，巨型纯真兔、魔魔胡胡胡萝卜等装置成五迷打卡热点',
     'type': 'activity', 'typeLabel': '活动', 'time': '昨天 12:15'},
    {'id': 'n004', 'title': '水立方「胡萝卜麦克风」破吉尼斯纪录',
     'summary': 'STAYREAL 与水立方联手打造 33 米巨型充气胡萝卜麦克风，获「最大的充气麦克风」吉尼斯世界纪录',
     'type': 'news', 'typeLabel': '资讯', 'time': '前天 21:00'},
    {'id': 'n005', 'title': '长沙 IFS「MOJO IN BLOOM」全国首展',
     'summary': '5/23 长沙 IFS 联合 STAYREAL 开启 MOJO FAMILY 全国首展，11 米长沙限定卜卜全球首展',
     'type': 'activity', 'typeLabel': '展览', 'time': '3 天前 11:42'},
]

SEED_COMMENTS = [
    {'id': 'seed_cmt_001', 'cornerId': 'corner_001', 'user': '倔强的番茄',
     'text': '拿铁拉花超美！老板说玛莎来的时候也是点这杯', 'time': '2026-06-18 14:32', 'likes': 12},
    {'id': 'seed_rpl_001', 'cornerId': 'corner_001', 'parentId': 'seed_cmt_001',
     'user': '明园老板', 'text': '谢谢支持～玛莎同款随时欢迎',
     'time': '2026-06-18 15:10', 'likes': 3},
    {'id': 'seed_cmt_002', 'cornerId': 'corner_001', 'user': '温柔的歌',
     'text': '演唱会前 1 小时来的，刚好不用排队，炸酱面绝了',
     'time': '2026-06-17 18:20', 'likes': 8},
    {'id': 'seed_cmt_003', 'cornerId': 'corner_002', 'user': '星空下的我们',
     'text': '外滩夜景 + 歌词地贴 = 完美出片，建议日落前来',
     'time': '2026-06-16 19:05', 'likes': 15},
    {'id': 'seed_rpl_002', 'cornerId': 'corner_002', 'parentId': 'seed_cmt_003',
     'user': '任意门守门人', 'text': '确实！19 点的光线最棒',
     'time': '2026-06-16 20:30', 'likes': 2},
    {'id': 'seed_cmt_004', 'cornerId': 'corner_003', 'user': '卜卜爱好者',
     'text': '7.4 米纯真兔太治愈了！限定 Tee 已入手',
     'time': '2026-06-15 16:00', 'likes': 21},
    {'id': 'seed_cmt_005', 'cornerId': 'corner_004', 'user': '梦想卜览员',
     'text': '33 米胡萝卜麦克风震撼！吉尼斯认证实至名归',
     'time': '2026-06-14 11:30', 'likes': 34},
    {'id': 'seed_cmt_006', 'cornerId': 'corner_009', 'user': '工业风五迷',
     'text': '首钢园日落 + 石头公仔 = 北京最出片打卡点，没有之一',
     'time': '2026-06-13 18:45', 'likes': 42},
    {'id': 'seed_rpl_003', 'cornerId': 'corner_009', 'parentId': 'seed_cmt_006',
     'user': '石头本石', 'text': '哈哈谢谢认可，下次一起走起',
     'time': '2026-06-13 22:00', 'likes': 5},
]


def _camel_to_snake(s):
    """驼峰转下划线，如 categoryLabel -> category_label"""
    out = []
    for ch in s:
        if ch.isupper():
            out.append('_' + ch.lower())
        else:
            out.append(ch)
    return ''.join(out)


def _convert(d):
    """把 dict 的 key 从驼峰转成下划线，匹配 SQLAlchemy 模型属性"""
    out = {}
    for k, v in d.items():
        key = _camel_to_snake(k)
        if key == 'concert_date' and isinstance(v, str):
            v = _parse_date(v)
        out[key] = v
    return out


def seed_all():
    """导入全部种子数据"""
    with app.app_context():
        db.create_all()

        # 角落
        if Corner.query.count() == 0:
            for c in CORNERS:
                db.session.add(Corner(**_convert(c)))
            print('[seed] 角落数据已导入: {} 条'.format(len(CORNERS)))
        else:
            print('[seed] 角落数据已存在，跳过')

        # 演唱会
        if Concert.query.count() == 0:
            for c in CONCERTS:
                db.session.add(Concert(**_convert(c)))
            print('[seed] 演唱会数据已导入: {} 条'.format(len(CONCERTS)))
        else:
            print('[seed] 演唱会数据已存在，跳过')

        # 资讯
        if News.query.count() == 0:
            for n in NEWS:
                db.session.add(News(**_convert(n)))
            print('[seed] 资讯数据已导入: {} 条'.format(len(NEWS)))
        else:
            print('[seed] 资讯数据已存在，跳过')

        # 种子评论
        if Comment.query.filter(Comment.is_seed == True).count() == 0:
            for c in SEED_COMMENTS:
                db.session.add(Comment(is_seed=True, **_convert(c)))
            print('[seed] 种子评论已导入: {} 条'.format(len(SEED_COMMENTS)))
        else:
            print('[seed] 种子评论已存在，跳过')

        db.session.commit()
        print('[seed] 全部种子数据导入完成')


if __name__ == '__main__':
    seed_all()
