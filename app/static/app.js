/* ===== MaydayLand · 五月天城市漫游 · 交互逻辑 ===== */

/* ---- 本地素材路径（assets/images/） ---- */
var ASSET = '/static/assets/images/';
var BALL = {
  blue:   ASSET + 'ui/blue.png',
  green:  ASSET + 'ui/green.png',
  yellow: ASSET + 'ui/yellow.png',
  pink:   ASSET + 'ui/pink.png',
  red:    ASSET + 'ui/red.png'
};
var LOGO_URL = ASSET + 'ui/五版logo.png';

/* 专辑封面：歌名 → 文件路径（用 encodeURI 处理中文） */
var ALBUM_BY_SONG = {
  '任意门':       ASSET + 'albums/' + encodeURIComponent('自传-C9G6ePFH.jpg'),
  '拥抱':         ASSET + 'albums/' + encodeURIComponent('第一张创作专辑-DkV_pH8G.jpg'),
  '倔强':         ASSET + 'albums/' + encodeURIComponent('知足 最真杰作选-Dshc6mg-.jpg'),
  '后青春期的诗': ASSET + 'albums/' + encodeURIComponent('后青春期的诗-EzCXj1Qb.jpg'),
  '步步':         ASSET + 'albums/' + encodeURIComponent('步步 自选作品辑-DoBobm4t.jpg'),
  '离开地球表面': ASSET + 'albums/' + encodeURIComponent('离开地球表面 Jump!-BhO1XiYG.jpg'),
  '因为你 所以我': ASSET + 'albums/' + encodeURIComponent('因为你 所以我-s_V6WMTD.jpg'),
  '成名在望':     ASSET + 'albums/' + encodeURIComponent('自传-C9G6ePFH.jpg'),
  '派对动物':     ASSET + 'albums/' + encodeURIComponent('自传-C9G6ePFH.jpg'),
  '如果我们不曾相遇': ASSET + 'albums/' + encodeURIComponent('自传-C9G6ePFH.jpg'),
  '突然好想你':   ASSET + 'albums/' + encodeURIComponent('后青春期的诗-EzCXj1Qb.jpg'),
  '志明与春娇':   ASSET + 'albums/' + encodeURIComponent('爱情万岁-C7BlxB8G.jpg'),
  '温柔':         ASSET + 'albums/' + encodeURIComponent('时光机-CGbQBaUm.jpg'),
  '玫瑰少年':     ASSET + 'albums/' + encodeURIComponent('玫瑰少年-DbTsPLrn.jpg'),
  '勇敢':         ASSET + 'albums/' + encodeURIComponent('勇敢-BXCpUl6B.jpg'),
  '人生海海':     ASSET + 'albums/' + encodeURIComponent('人生海海-BOGDD25n.jpg'),
  '盛夏光年':     ASSET + 'albums/' + encodeURIComponent('盛夏光年-DeGlutqh.jpg'),
  '伤心的人别听慢歌': ASSET + 'albums/' + encodeURIComponent('伤心的人别听慢歌-C6arM80p.jpg'),
  '将军令':       ASSET + 'albums/' + encodeURIComponent('将军令-CxjrlsAV.jpg'),
  '凡人歌':       ASSET + 'albums/' + encodeURIComponent('凡人歌-B23FlQae.jpg'),
  'DNA':          ASSET + 'albums/' + encodeURIComponent('DNA-cz_Tdu1n.jpg'),
  '如烟':         ASSET + 'albums/' + encodeURIComponent('为爱而生-B4BFUtgw.jpg')
};
var DEFAULT_ALBUM = ASSET + 'albums/' + encodeURIComponent('自传-C9G6ePFH.jpg');

/* 给角落图找一张专辑封面（优先按 song 匹配，fallback 用默认专辑封面） */
function img(idOrSong, song){
  /* 兼容旧调用 img(imageId)；新调用建议传 (corner.imageId, corner.song) */
  var key = song || idOrSong;
  if (typeof key === 'string' && ALBUM_BY_SONG[key]) return ALBUM_BY_SONG[key];
  return DEFAULT_ALBUM;
}

/* ---- 种子数据：12 个真实五迷角落（2026 最新） ---- */
var corners = [
  {id:'corner_001',name:'明园餐厅',city:'北京',address:'东城区北总布胡同 21 号',categoryLabel:'五迷同款',imageId:431,lyric:'一碗炸酱面 吃出了整个老北京',song:'任意门',lyricCredit:'玛莎 2026 鸟巢演唱会期间同款',passcode:'玛莎同款',recommend:'演唱会期间排队超 100 号，炸酱面、焦熘丸子必点',likes:315,notes:67,distanceText:'距鸟巢 4.2km',moodTags:['同款','地道','烟火气'],lat:39.9042,lng:116.4074,description:'藏在北总布胡同里的老北京家常菜馆，玛莎鸟巢演唱会期间被五迷发现并疯狂打卡。老板是地道北京人，炸酱面配方传了三代，焦熘丸子外酥里嫩。墙上贴满了五迷留下的合影和便利贴，是演唱会前后"续场"的热门据点。',openingHours:'11:00-21:00',phone:'010-6523XXXX',tags:['复古','胡同','烟火气','五迷同款'],tips:'演唱会期间建议提前 1 小时到店，对暗号"玛莎同款"可获赠酸梅汤一杯'},
  {id:'corner_002',name:'北外滩歌词地贴步道',city:'上海',address:'北外滩滨江绿地',categoryLabel:'打卡地',imageId:1080,lyric:'外滩风光 跃出课本 是那么新鲜',song:'任意门',lyricCredit:'2025 上海 MAYDAYLAND 官方打卡点',passcode:'任意门',recommend:'五公仔人偶 + 歌词地贴，背景是浦东陆家嘴',likes:186,notes:28,distanceText:'距上海体育场 5.1km',moodTags:['地标','浪漫','夜景'],lat:31.2450,lng:121.4900,description:'2025 上海站 MAYDAYLAND 官方设置的歌词地贴步道，沿北外滩滨江延伸 500 米，每一步都踩着五月天的金句。五公仔人偶错落分布，背景是浦东陆家嘴天际线，日落与夜景皆可出片。',openingHours:'全天开放',phone:'无',tags:['地标','浪漫','夜景','官方'],tips:'日落前 1 小时最佳光线，周末人较多建议工作日前往'},
  {id:'corner_003',name:'西单更新场 STAYREAL PARK',city:'北京',address:'西城区西单北大街 180 号',categoryLabel:'快闪店',imageId:250,lyric:'给我抱抱 把爱传出去',song:'拥抱',lyricCredit:'STAYREAL PARK 4.0 拥抱公园主题',passcode:'给我抱抱',recommend:'7.4 米纯真兔、6 米胡萝卜、京味漫游限定周边',likes:238,notes:42,distanceText:'距鸟巢 9.8km',moodTags:['治愈','潮玩','限定'],lat:39.9090,lng:116.3730,description:'STAYREAL PARK 4.0「拥抱公园」主题快闪，7.4 米纯真兔坐镇中庭，6 米胡萝卜装置可互动。京味漫游限定周边仅此一站有售，包括胡同元素卜卜 Tee、京剧脸谱公仔等。',openingHours:'10:00-22:00',phone:'010-6655XXXX',tags:['潮玩','限定','治愈','快闪'],tips:'限定周边库存有限，建议开馆即入手；对暗号享 9 折'},
  {id:'corner_004',name:'水立方 MOJO EXPO',city:'北京',address:'朝阳区天辰东路 11 号',categoryLabel:'展览',imageId:292,lyric:'真正的人生梦想 在你的手上',song:'倔强',lyricCredit:'2026 鸟巢演唱会期间限定装置',passcode:'梦想卜览',recommend:'33 米巨型胡萝卜麦克风，吉尼斯世界纪录认证',likes:421,notes:89,distanceText:'距鸟巢 0.5km',moodTags:['梦想','震撼','打卡'],lat:39.9930,lng:116.3970,description:'鸟巢演唱会期间限定开放的 MOJO EXPO，33 米巨型胡萝卜麦克风获吉尼斯世界纪录认证。馆内设五大沉浸式展区，从「无名高地」到「鸟巢 55 场」完整回顾五月天 25 年历程，出口处可盖限定纪念章。',openingHours:'09:00-21:00',phone:'010-8437XXXX',tags:['展览','震撼','限定','吉尼斯'],tips:'凭演唱会门票可免预约入场，出口纪念章仅限当日盖'},
  {id:'corner_005',name:'THE BOX 朝外 MAYDAYLAND',city:'北京',address:'朝阳区朝阳门外大街 10 号 B 馆 L3',categoryLabel:'特展',imageId:1015,lyric:'从无名高地到鸟巢的 10 年',song:'任意门',lyricCredit:'2026 北京限定特展官方文案',passcode:'回到那一天',recommend:'4/25-5/19 限定展，需凭演唱会门票预约',likes:567,notes:134,distanceText:'距鸟巢 8.6km',moodTags:['展览','限定','回忆'],lat:39.9230,lng:116.4480,description:'2026 北京限定特展，4/25-5/19 仅 25 天。以「从无名高地到鸟巢的 10 年」为主线，展出历年演唱会舞台模型、阿信手稿复刻、五人乐器 1:1 还原。需凭演唱会门票预约，每日限流 800 人。',openingHours:'10:00-22:00',phone:'010-8562XXXX',tags:['展览','限定','回忆','预约'],tips:'必须提前在 MaydayLand 小程序预约，每日 800 人满即止'},
  {id:'corner_006',name:'东方明珠 MAYDAYLAND',city:'上海',address:'浦东新区世纪大道 1 号',categoryLabel:'打卡地',imageId:119,lyric:'因为你 所以我 爱上那片天空',song:'因为你 所以我',lyricCredit:'2025 上海站「MAYDAYLAND 东方明珠指挥总部」',passcode:'因为你所以五',recommend:'5.025 米 SUPER MAYDAY MAX 乐高机甲 + 喵星人装置',likes:198,notes:31,distanceText:'距上海体育场 6.3km',moodTags:['地标','科技感','合影'],lat:31.2397,lng:121.4998,description:'2025 上海站「MAYDAYLAND 东方明珠指挥总部」遗址，5.025 米 SUPER MAYDAY MAX 乐高机甲永久保留。喵星人装置与东方明珠塔同框，是上海五迷的"朝圣点"。塔下广场设有歌词投影，每晚 19:00/20:00 各一场。',openingHours:'全天开放（投影 19:00/20:00）',phone:'021-5879XXXX',tags:['地标','科技感','合影','夜景'],tips:'乐高机甲夜间有灯光秀，投影时段提前 15 分钟到场占位'},
  {id:'corner_007',name:'长沙 IFS 卜卜花园',city:'长沙',address:'芙蓉区解放西路 188 号',categoryLabel:'首展',imageId:326,lyric:'绽放星城 一起拥抱',song:'拥抱',lyricCredit:'MOJO IN BLOOM 全国首展 2026.05.23',passcode:'MOJO IN BLOOM',recommend:'11 米长沙限定卜卜全球首展，三大沉浸式展区',likes:287,notes:56,distanceText:'市中心',moodTags:['首展','卜卜','治愈'],lat:28.1970,lng:112.9750,description:'STAYREAL MOJO IN BLOOM 全国首展，11 米长沙限定卜卜全球首次亮相。三大沉浸式展区：花海迷宫、卜卜咖啡馆、限定周边店。长沙限定口味「臭豆腐卜卜」周边仅此有售。',openingHours:'10:00-22:00',phone:'0731-8488XXXX',tags:['首展','卜卜','治愈','限定'],tips:'工作日 14:00 后人少，臭豆腐卜卜周边每日限量 50 个'},
  {id:'corner_008',name:'钟鼓楼广场 怪兽公仔',city:'北京',address:'东城区钟鼓楼广场',categoryLabel:'公仔点',imageId:1018,lyric:'我和我最后的倔强 握紧双手绝对不放',song:'倔强',lyricCredit:'北京旅游集散中心「五迷专属打卡巴士」首站',passcode:'倔强',recommend:'官方打卡观光巴士起点，串联五大成员公仔点位',likes:142,notes:19,distanceText:'距鸟巢 7.5km',moodTags:['倔强','城市漫游','官方'],lat:39.9410,lng:116.3970,description:'北京旅游集散中心推出的「五迷专属打卡巴士」首站，怪兽公仔坐镇钟鼓楼广场。巴士串联五大成员公仔点位（钟鼓楼/首钢园/朝阳公园/居庸关/鸟巢），全程约 4 小时，含讲解。',openingHours:'巴士 09:00/13:00 两班',phone:'010-8401XXXX',tags:['倔强','城市漫游','官方','巴士'],tips:'巴士需提前 1 天预约，凭 MaydayLand 打卡记录享 8 折'},
  {id:'corner_009',name:'首钢园 石头公仔',city:'北京',address:'石景山区石景山路 68 号',categoryLabel:'公仔点',imageId:1036,lyric:'然后呢 一起走吧',song:'后青春期的诗',lyricCredit:'首钢园沉淀池广场限定装置',passcode:'一起走吧',recommend:'工业风背景 + 石头公仔，日落时分最出片',likes:632,notes:156,distanceText:'距鸟巢 12km',moodTags:['工业风','日落','出片'],lat:39.9250,lng:116.1750,description:'首钢园沉淀池广场的石头公仔，背靠工业遗迹高炉，硬核工业风与治愈公仔形成强烈反差。日落时分金色光线打在高炉上，是北京五迷公认的"最出片"打卡点。园区免费开放，可骑行游览。',openingHours:'全天开放',phone:'010-8829XXXX',tags:['工业风','日落','出片','免费'],tips:'日落前 40 分钟到达最佳，园区内可租共享单车'},
  {id:'corner_010',name:'朝阳公园五色大球',city:'北京',address:'朝阳区朝阳公园南路 1 号',categoryLabel:'应援点',imageId:1044,lyric:'天空和我的中间 只剩倾盆的思念',song:'步步',lyricCredit:'2026 鸟巢演唱会期间五大球巨型气膜回归',passcode:'五月天',recommend:'五大球巨型气膜 + 好运桥《星空》光影秀',likes:389,notes:78,distanceText:'距鸟巢 6.8km',moodTags:['应援','夜景','五大球'],lat:39.9430,lng:116.4780,description:'2026 鸟巢演唱会期间回归的五大球巨型气膜，蓝粉黄绿紫五色对应五位成员。夜晚 19:00-22:00 灯光秀，配合好运桥《星空》光影步道，是演唱会前后最热闹的五迷聚集地。',openingHours:'气膜 09:00-22:00',phone:'010-6595XXXX',tags:['应援','夜景','五大球','光影'],tips:'灯光秀整点开始，好运桥步道限流建议 18:30 排队'},
  {id:'corner_011',name:'居庸关长城 阿信公仔',city:'北京',address:'昌平区居庸关长城',categoryLabel:'公仔点',imageId:1082,lyric:'不到长城非好汉',song:'离开地球表面',lyricCredit:'北京旅游集散中心官方打卡巴士线路三',passcode:'离开地球表面',recommend:'官方「痛车」巴士可达，长城 + 阿信公仔同框',likes:478,notes:92,distanceText:'距鸟巢 45km',moodTags:['长城','官方','壮观'],lat:40.2910,lng:116.0710,description:'北京旅游集散中心官方打卡巴士线路三终点，阿信公仔立于居庸关长城烽火台。官方「痛车」巴士车身印满五月天元素，从鸟巢出发约 1.5 小时。长城 + 阿信同框，是"不到长城非好汉"的五迷版诠释。',openingHours:'巴士 08:00 单班',phone:'010-8401XXXX',tags:['长城','官方','壮观','痛车'],tips:'巴士仅 08:00 一班，返程 15:00，需带身份证购票'},
  {id:'corner_012',name:'阿信同款烧饼店',city:'北京',address:'东城区某胡同（凭暗号解锁地址）',categoryLabel:'五迷同款',imageId:580,lyric:'就算失望 不能绝望',song:'倔强',lyricCredit:'阿信早年社交平台分享的老北京烧饼',passcode:'不能绝望',recommend:'阿信随手分享后成为五迷隐藏打卡点，价格实惠馅扎实',likes:92,notes:11,distanceText:'距鸟巢 6.5km',moodTags:['同款','隐藏','烟火气'],lat:39.8900,lng:116.4300,description:'阿信早年社交平台随手分享的老北京烧饼店，被五迷考古后成为隐藏打卡点。地址需对暗号"不能绝望"才告知，保护店家日常生意。烧饼 5 元一个，馅料扎实，是"就算失望不能绝望"的烟火气注脚。',openingHours:'06:00-11:00（售完即止）',phone:'凭暗号解锁',tags:['同款','隐藏','烟火气','平价'],tips:'营业时间极短，建议早 7 点前到，对暗号后老板会画地图'}
];

var concerts = [
  {id:'c001',city:'北京',venue:'国家体育场（鸟巢）',dateText:'2026.04.30 - 05.18',status:'ended',statusLabel:'已收官',posterId:1015,highlight:'5525+2 回到那一天 · 连开 12 场累计 55 场鸟巢演出，刷新华语乐团纪录。场馆周边五迷角落密集，水立方胡萝卜麦克风仅 0.5km。',lat:39.9920,lng:116.3970,concertDate:'2026-05-18'},
  {id:'c002',city:'台北',venue:'台北大巨蛋',dateText:'2026.07.03 / 04 / 05 / 08 / 10 / 11 / 12',status:'upcoming',statusLabel:'即将开演',posterId:1018,highlight:'五月天重返台北大巨蛋，7 场连唱。5/23 拓元售票已启动，周三/五 19:00、周六/日 18:30 开演。',lat:25.0597,lng:121.5500,concertDate:'2026-07-03'},
  {id:'c003',city:'长沙',venue:'长沙 IFS',dateText:'2026.05.23 起',status:'upcoming',statusLabel:'即将开演',posterId:1044,highlight:'STAYREAL MOJO IN BLOOM 全国首展，11 米长沙限定卜卜全球首展，三大沉浸式展区。',lat:28.1970,lng:112.9750,concertDate:'2026-05-23'},
  {id:'c004',city:'上海',venue:'上海体育场',dateText:'2026 夏（待官宣）',status:'upcoming',statusLabel:'待官宣',posterId:1036,highlight:'2025 上海站 MAYDAYLAND 东方明珠指挥总部大获成功，2026 夏季有望回归，北外滩歌词地贴步道持续开放。',lat:31.1880,lng:121.4370,concertDate:'2026-07-15'}
];

var news = [
  {id:'n001',title:'鸟巢 12 场收官创纪录',summary:'五月天「5525+2 回到那一天」北京鸟巢站 4/30-5/18 连开 12 场，累计 55 场鸟巢演出刷新华语乐团纪录',type:'news',typeLabel:'资讯',time:'今天 09:24'},
  {id:'n002',title:'台北站重回大巨蛋 7/3 起开唱',summary:'台北大巨蛋 7/3、4、5、8、10、11、12 共七场，5/23 拓元售票已启动，周三/五 19:00、周六/日 18:30 开演',type:'ticket',typeLabel:'票务',time:'昨天 18:02'},
  {id:'n003',title:'STAYREAL PARK 4.0 北京西单更新场',summary:'五一期间西单更新场单日客流破 7 万，巨型纯真兔、魔魔胡胡胡萝卜等装置成五迷打卡热点',type:'activity',typeLabel:'活动',time:'昨天 12:15'},
  {id:'n004',title:'水立方「胡萝卜麦克风」破吉尼斯纪录',summary:'STAYREAL 与水立方联手打造 33 米巨型充气胡萝卜麦克风，获「最大的充气麦克风」吉尼斯世界纪录',type:'news',typeLabel:'资讯',time:'前天 21:00'},
  {id:'n005',title:'长沙 IFS「MOJO IN BLOOM」全国首展',summary:'5/23 长沙 IFS 联合 STAYREAL 开启 MOJO FAMILY 全国首展，11 米长沙限定卜卜全球首展',type:'activity',typeLabel:'展览',time:'3 天前 11:42'}
];

var moodKeywords = ['全部','温柔','倔强','同款','地标','限定','首展','官方','打卡','治愈','夜景'];

var allBadges = [
  {song:'倔强',icon:'🔥',color:'#FF6B9D'},
  {song:'温柔',icon:'🌸',color:'#FFD23F'},
  {song:'任意门',icon:'🚪',color:'#3B7DD8'},
  {song:'拥抱',icon:'🤗',color:'#4ECDC4'},
  {song:'步步',icon:'👣',color:'#9B7EDE'},
  {song:'后青春期的诗',icon:'📖',color:'#3B7DD8'},
  {song:'因为你 所以我',icon:'💙',color:'#4ECDC4'},
  {song:'离开地球表面',icon:'🚀',color:'#FF6B9D'}
];

/* ---- 种子评论（v1.1 评论增强） ---- */
var seedComments=[
  {id:'seed_cmt_001',cornerId:'corner_001',user:'倔强的番茄',text:'拿铁拉花超美！老板说玛莎来的时候也是点这杯',time:'2026-06-18 14:32',likes:12,replies:[{id:'seed_rpl_001',user:'明园老板',text:'谢谢支持～玛莎同款随时欢迎',time:'2026-06-18 15:10',likes:3}]},
  {id:'seed_cmt_002',cornerId:'corner_001',user:'温柔的歌',text:'演唱会前 1 小时来的，刚好不用排队，炸酱面绝了',time:'2026-06-17 18:20',likes:8,replies:[]},
  {id:'seed_cmt_003',cornerId:'corner_002',user:'星空下的我们',text:'外滩夜景 + 歌词地贴 = 完美出片，建议日落前来',time:'2026-06-16 19:05',likes:15,replies:[{id:'seed_rpl_002',user:'任意门守门人',text:'确实！19 点的光线最棒',time:'2026-06-16 20:30',likes:2}]},
  {id:'seed_cmt_004',cornerId:'corner_003',user:'卜卜爱好者',text:'7.4 米纯真兔太治愈了！限定 Tee 已入手',time:'2026-06-15 16:00',likes:21,replies:[]},
  {id:'seed_cmt_005',cornerId:'corner_004',user:'梦想卜览员',text:'33 米胡萝卜麦克风震撼！吉尼斯认证实至名归',time:'2026-06-14 11:30',likes:34,replies:[]},
  {id:'seed_cmt_006',cornerId:'corner_009',user:'工业风五迷',text:'首钢园日落 + 石头公仔 = 北京最出片打卡点，没有之一',time:'2026-06-13 18:45',likes:42,replies:[{id:'seed_rpl_003',user:'石头本石',text:'哈哈谢谢认可，下次一起走起',time:'2026-06-13 22:00',likes:5}]}
];

/* ---- 全局状态 ---- */
var state = { tab:'discover', currentCorner:null, currentConcert:null, activeTag:'全部', keyword:'', checkinTpl:'polaroid', checkinPhoto:null, stack:['discover'], countdownTimer:null, checkinDistance:null, checkinMode:'strict', currentCity:'北京', replyTo:null };

/* ---- 城市配置 ---- */
var cityConfig=[
  {name:'北京',color:'#FFD23F',emoji:'🏛️'},
  {name:'上海',color:'#3B7DD8',emoji:'🌃'},
  {name:'台北',color:'#FF6B9D',emoji:'🗼'},
  {name:'广州',color:'#4ECDC4',emoji:'🌸'},
  {name:'成都',color:'#9B7EDE',emoji:'🐼'}
];

/* ---- 歌单解锁配置（24 首精选，按专辑分组） ---- */
var songUnlockConfig=[
  {album:'第一张创作专辑',songs:[{name:'志明与春娇',color:'#3B7DD8'},{name:'轧车',color:'#4ECDC4'}]},
  {album:'爱情万岁',songs:[{name:'爱情万岁',color:'#FF6B9D'}]},
  {album:'人生海海',songs:[{name:'人生海海',color:'#9B7EDE',unlock:{action:'cities',value:5}},{name:'温柔',color:'#FF6B9D',unlock:{action:'commentLiked',value:10}}]},
  {album:'时光机',songs:[{name:'倔强',color:'#FFD23F',unlock:{action:'passcode',value:1}},{name:'知足',color:'#4ECDC4',unlock:{action:'share',value:1}},{name:'垃圾车',color:'#3B7DD8'}]},
  {album:'神的孩子都在跳舞',songs:[{name:'恋爱ing',color:'#FF6B9D'},{name:'离开地球表面',color:'#9B7EDE',unlock:{action:'citySwitch',value:3}}]},
  {album:'为爱而生',songs:[{name:'突然好想你',color:'#FFD23F',unlock:{action:'looseCheckin',value:1}},{name:'小太阳',color:'#4ECDC4'}]},
  {album:'后青春期的诗',songs:[{name:'你不是真正的快乐',color:'#3B7DD8'},{name:'生存以上 生活以下',color:'#FF6B9D'}]},
  {album:'第二人生',songs:[{name:'干杯',color:'#FFD23F',unlock:{action:'checkin',value:5}},{name:'诺亚方舟',color:'#9B7EDE'},{name:'星空',color:'#3B7DD8'}]},
  {album:'自传',songs:[{name:'任意门',color:'#4ECDC4',unlock:{action:'firstCheckin',value:1}},{name:'成名在望',color:'#FF6B9D'},{name:'后来的我们',color:'#9B7EDE'},{name:'派对动物',color:'#FFD23F'},{name:'如果我们不曾相遇',color:'#3B7DD8'}]}
];

/* ---- 本地存储 ---- */
var ls = {
  get:function(k,d){ try{ var v=localStorage.getItem('ml_'+k); return v?JSON.parse(v):d; }catch(e){ return d; } },
  set:function(k,v){ localStorage.setItem('ml_'+k, JSON.stringify(v)); }
};

/* ---- API 工具（微信云托管 Flask 后端） ---- */
var api = {
  base: '/api',
  get: function(path){ return fetch(this.base+path).then(function(r){ return r.json(); }).then(function(d){ return d.code===0?d.data:null; }).catch(function(e){ console.error('[api.get]',path,e); return null; }); },
  post: function(path, body){ return fetch(this.base+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){ return r.json(); }).then(function(d){ return d.code===0?d.data:null; }).catch(function(e){ console.error('[api.post]',path,e); return null; }); },
  put: function(path, body){ return fetch(this.base+path,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){ return r.json(); }).then(function(d){ return d.code===0?d.data:null; }).catch(function(e){ console.error('[api.put]',path,e); return null; }); }
};

/* ---- Toast ---- */
function toast(m){ var t=document.getElementById('toast'); t.textContent=m; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); },1800); }

/* ---- 时钟（状态栏已移除，保留空函数避免报错） ---- */
function tick(){ var el=document.getElementById('clock'); if(el){ var d=new Date(); el.textContent=d.getHours()+':'+String(d.getMinutes()).padStart(2,'0'); } }
setInterval(tick,30000); tick();

/* ---- 路由 ---- */
function goBack(){
  if(state.stack.length>1){
    state.stack.pop();
    var p=state.stack[state.stack.length-1];
    if(['discover','concert','mine'].indexOf(p)>=0){ switchTab(p); } else { showPage(p); }
  } else { switchTab('discover'); }
}
function showPage(p){
  document.querySelectorAll('.page').forEach(function(el){ el.classList.remove('active'); });
  var el=document.getElementById('page-'+p);
  el.classList.add('active','slide-in');
  setTimeout(function(){ el.classList.remove('slide-in'); },350);
  if(['discover','concert','mine'].indexOf(p)<0){ document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); }); }
  state.tab=p;
}
function navigate(page,cornerId){
  showPage(page);
  state.stack.push(page);
  if(cornerId){ state.currentCorner=corners.find(function(c){ return c.id===cornerId; }); renderCorner(); }
}
function switchTab(tab){
  state.tab=tab;
  document.querySelectorAll('.tab').forEach(function(t){ t.classList.toggle('active', t.dataset.tab===tab); });
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById('page-'+tab).classList.add('active');
  state.stack=[tab];
  if(tab==='mine') renderMine();
  if(tab==='concert') renderConcert();
}

/* ---- 发现页 ---- */
function renderTags(){
  document.getElementById('tagRow').innerHTML = moodKeywords.map(function(k){
    return '<div class="pill '+(k===state.activeTag?'active':'')+'" onclick="filterTag(\''+k+'\')">'+k+'</div>';
  }).join('');
}
function renderCornerList(){
  var list=corners.filter(function(c){ return c.city===state.currentCity; });
  if(state.activeTag!=='全部') list=list.filter(function(c){ return c.moodTags.indexOf(state.activeTag)>=0; });
  if(state.keyword){
    var kw=state.keyword;
    list=list.filter(function(c){ return c.lyric.indexOf(kw)>=0||c.song.indexOf(kw)>=0||c.name.indexOf(kw)>=0||c.moodTags.some(function(t){ return t.indexOf(kw)>=0; }); });
  }
  document.getElementById('cornerCount').textContent=list.length+' 个真实打卡点';
  var el=document.getElementById('cornerList');
  if(!list.length){ el.innerHTML='<div class="empty">'+
    '<div style="font-size:48px;margin-bottom:12px">🔍</div>'+
    '<div>当前城市暂无匹配角落，切换城市或换个关键词试试～</div>'+
    '<button class="empty-cta" onclick="recommendCorner()">让 MaydayLand 推荐一个</button></div>'; return; }
  el.className='fade-in';
  el.innerHTML=list.map(function(c){
    return '<div class="corner-card" onclick="navigate(\'corner\',\''+c.id+'\')">'+
      '<div class="corner-img-wrap"><img src="'+img(c.imageId,c.song)+'" alt="'+c.name+'" loading="lazy">'+
      '<span class="corner-cat">'+c.categoryLabel+'</span>'+
      '<div class="corner-lyric-badge"><div class="lyric">「'+c.lyric+'」</div><div class="song">— '+c.song+'</div></div></div>'+
      '<div class="corner-body"><div class="corner-name">'+c.name+' <span class="dist">'+c.distanceText+'</span></div>'+
      '<div class="corner-addr">'+c.city+' · '+c.address+'</div>'+
      '<div class="corner-tags">'+c.moodTags.map(function(t){ return '<span class="t">#'+t+'</span>'; }).join('')+'</div>'+
      '<div class="corner-stats"><span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9C1 9 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 5 23 9 21.5 12 19 16.5 12 21 12 21z"/></svg>'+c.likes+'</span>'+
      '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'+c.notes+'</span></div></div></div>';
  }).join('');
  setTimeout(function(){ el.classList.remove('fade-in'); }, 220);
}
function filterTag(k){ state.activeTag=k; renderTags(); renderCornerList(); }

/* 搜索空结果引导推荐 CTA（share-growth spec） */
function recommendCorner(){
  var fp=ls.get('footprints',[]);
  var unvisited=corners.filter(function(c){ return !fp.some(function(f){ return f.cornerId===c.id; }); });
  var pool=unvisited.length?unvisited:corners;
  var pick=pool[Math.floor(Math.random()*pool.length)];
  toast('为你推荐：'+pick.name+' · 「'+pick.lyric+'」');
  setTimeout(function(){ navigate('corner',pick.id); }, 800);
}

document.getElementById('searchInput').addEventListener('input',function(e){
  state.keyword=e.target.value.trim();
  document.getElementById('searchClear').style.display=state.keyword?'block':'none';
  renderCornerList();
});
document.getElementById('searchClear').addEventListener('click',function(){
  state.keyword=''; document.getElementById('searchInput').value=''; document.getElementById('searchClear').style.display='none'; renderCornerList();
});

/* ---- 地图标记 ---- */
function renderMapPins(){
  var cc=corners.filter(function(c){ return c.city===state.currentCity; });
  document.getElementById('mapTitle').textContent='五迷角落地图 · '+state.currentCity;
  var pos=[[80,60],[120,90],[160,70],[200,110],[240,80],[280,120],[100,150],[220,160],[300,90],[150,180]];
  var colors=['#3B7DD8','#FF6B9D','#FFD23F','#4ECDC4','#9B7EDE'];
  document.getElementById('mapPins').innerHTML=cc.slice(0,10).map(function(c,i){
    return '<g class="map-pin" onclick="navigate(\'corner\',\''+c.id+'\')">'+
      '<circle cx="'+pos[i][0]+'" cy="'+pos[i][1]+'" r="7" fill="'+colors[i%5]+'" stroke="#fff" stroke-width="2"/>'+
      '<text x="'+pos[i][0]+'" y="'+(pos[i][1]+3)+'" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">'+(i+1)+'</text></g>';
  }).join('');
}

/* ---- 角落详情 ---- */
function renderCorner(){
  var c=state.currentCorner; if(!c) return;
  document.getElementById('detailImg').src=img(c.imageId,c.song);
  document.getElementById('detailLyric').textContent='「'+c.lyric+'」';
  document.getElementById('detailCredit').textContent='— '+c.song+' · '+c.lyricCredit;
  document.getElementById('detailName').textContent=c.name;
  document.getElementById('detailAddr').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'+c.city+' · '+c.address+' · '+c.distanceText;
  document.getElementById('detailRecommend').textContent=c.recommend;
  document.getElementById('detailPasscode').textContent=c.passcode;
  /* v1.1：增强字段 */
  var descEl=document.getElementById('detailDescription');
  if(c.description){ descEl.textContent=c.description; descEl.style.display='block'; } else { descEl.style.display='none'; }
  var infoEl=document.getElementById('detailInfoCard');
  var infoHtml='';
  if(c.openingHours) infoHtml+='<div class="detail-info-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>营业时间：'+c.openingHours+'</div>';
  if(c.phone && c.phone!=='无' && c.phone!=='凭暗号解锁') infoHtml+='<div class="detail-info-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><a href="tel:'+c.phone+'">'+c.phone+'</a></div>';
  infoHtml+='<div class="detail-info-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'+c.distanceText+'</div>';
  if(c.tags && c.tags.length) infoHtml+='<div class="detail-tags">'+c.tags.map(function(t){ return '<span class="detail-tag">#'+t+'</span>'; }).join('')+'</div>';
  infoEl.innerHTML=infoHtml;
  var tipsEl=document.getElementById('detailTips');
  if(c.tips){ tipsEl.innerHTML='<div class="detail-tips-icon">💡</div><div>'+c.tips+'</div>'; tipsEl.style.display='flex'; } else { tipsEl.style.display='none'; }
  renderComments();
}

/* ---- v1.1：角落详情增强 - 大地图 / 导航 ---- */
function openBigMap(){
  var c=state.currentCorner; if(!c) return;
  var url='https://uri.amap.com/marker?position='+c.lng+','+c.lat+'&name='+encodeURIComponent(c.name)+'&coordinate=wgs84&callnative=1';
  window.open(url,'_blank');
  toast('已打开高德地图查看大图 🗺️');
}
function navigateToCorner(){
  var c=state.currentCorner; if(!c) return;
  /* 优先尝试高德 URL Scheme，失败则降级到网页版 */
  var amapUrl='https://uri.amap.com/navigation?to='+c.lng+','+c.lat+','+encodeURIComponent(c.name)+'&mode=car&coordinate=wgs84&callnative=1';
  var baiduUrl='https://api.map.baidu.com/direction?destination=latlng:'+c.lat+','+c.lng+'|name:'+encodeURIComponent(c.name)+'&mode=driving&coord_type=wgs84&output=html';
  var ua=navigator.userAgent;
  if(/iphone|ipad|ipod/i.test(ua)){
    /* iOS：尝试 Apple Maps */
    window.location.href='maps://?daddr='+c.lat+','+c.lng+'&q='+encodeURIComponent(c.name);
    setTimeout(function(){ window.open(amapUrl,'_blank'); }, 800);
  } else {
    window.open(amapUrl,'_blank');
  }
  toast('正在唤起导航 🧭');
}
function copyAddress(){
  var c=state.currentCorner; if(!c) return;
  var text=c.city+' '+c.address;
  if(navigator.clipboard){ navigator.clipboard.writeText(text).then(function(){ toast('地址已复制 📋'); }); }
  else { toast('请长按地址手动复制'); }
}
function renderComments(){
  var c=state.currentCorner; var list=ls.get('comments_'+c.id,[]);
  /* 合并种子评论 */
  var seed=seedComments.filter(function(s){ return s.cornerId===c.id; });
  list=seed.concat(list);
  document.getElementById('commentCount').textContent=list.length;
  var colors=['#3B7DD8','#FF6B9D','#FFD23F','#4ECDC4','#9B7EDE'];
  var likedIds=ls.get('likedCommentIds',[]);
  document.getElementById('commentList').innerHTML=list.length?list.map(function(cm,i){
    var liked=likedIds.indexOf(cm.id)>=0;
    var repliesHtml=(cm.replies&&cm.replies.length)?'<div class="comment-replies">'+cm.replies.map(function(r,ri){
      var rliked=likedIds.indexOf(r.id)>=0;
      return '<div class="reply-item"><span class="reply-user">'+r.user+'：</span>'+r.text+
        '<div class="reply-actions"><span class="comment-action '+(rliked?'liked':'')+'" onclick="toggleReplyLike(\''+cm.id+'\',\''+r.id+'\')"><svg viewBox="0 0 24 24" fill="'+(rliked?'currentColor':'none')+'" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9C1 9 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 5 23 9 21.5 12 19 16.5 12 21 12 21z"/></svg>'+(r.likes||0)+'</span></div></div>';
    }).join('')+'</div>':'';
    return '<div class="comment-item"><div class="comment-header">'+
      '<div class="comment-avatar" style="background:'+colors[i%5]+'">'+(cm.user[0]||'五')+'</div>'+
      '<div class="comment-user">'+cm.user+'</div>'+
      '<div class="comment-time">'+cm.time+'</div></div>'+
      '<div class="comment-text">'+cm.text+'</div>'+
      '<div class="comment-actions">'+
        '<span class="comment-action '+(liked?'liked':'')+'" onclick="toggleCommentLike(\''+cm.id+'\')"><svg viewBox="0 0 24 24" fill="'+(liked?'currentColor':'none')+'" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9C1 9 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 5 23 9 21.5 12 19 16.5 12 21 12 21z"/></svg>'+(cm.likes||0)+'</span>'+
        '<span class="comment-action" onclick="showReplyInput(\''+cm.id+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>回复</span>'+
      '</div>'+repliesHtml+
      '<div class="reply-input-box" id="replyBox_'+cm.id+'"><input id="replyInput_'+cm.id+'" placeholder="回复 '+cm.user+'："><button onclick="sendReply(\''+cm.id+'\')">发送</button></div></div>';
  }).join(''):'<div class="empty">还没有留言，做第一个发声的五迷吧～</div>';
}
function toggleCommentLike(cid){
  var list=ls.get('comments_'+state.currentCorner.id,[]);
  var cm=list.find(function(c){ return c.id===cid; });
  if(!cm){ /* 种子评论：本地记录点赞 */ cm=seedComments.find(function(c){ return c.id===cid; }); }
  if(!cm) return;
  var likedIds=ls.get('likedCommentIds',[]);
  var idx=likedIds.indexOf(cid);
  var isAdding=idx<0;
  if(idx>=0){ likedIds.splice(idx,1); cm.likes=Math.max(0,(cm.likes||0)-1); }
  else { likedIds.push(cid); cm.likes=(cm.likes||0)+1; }
  ls.set('likedCommentIds',likedIds);
  /* 如果是种子评论，把点赞数记录到本地覆盖 */
  var overrides=ls.get('commentLikeOverrides',{}); overrides[cid]=cm.likes; ls.set('commentLikeOverrides',overrides);
  /* v1.1：评论被点赞计数（仅当评论作者不是"我"时累加，支撑歌单解锁） */
  if(isAdding && cm.user!=='我'){
    ls.set('commentLikedCount', ls.get('commentLikedCount',0)+1);
  } else if(!isAdding && cm.user!=='我'){
    ls.set('commentLikedCount', Math.max(0, ls.get('commentLikedCount',0)-1));
  }
  /* 同步到后端 */
  api.post('/comments/'+cid+'/like',{});
  renderComments();
  checkSongUnlock('commentLiked');
}
function toggleReplyLike(cid,rid){
  var list=ls.get('comments_'+state.currentCorner.id,[]);
  var cm=list.find(function(c){ return c.id===cid; });
  if(!cm) cm=seedComments.find(function(c){ return c.id===cid; });
  if(!cm||!cm.replies) return;
  var r=cm.replies.find(function(x){ return x.id===rid; }); if(!r) return;
  var likedIds=ls.get('likedCommentIds',[]);
  var idx=likedIds.indexOf(rid);
  if(idx>=0){ likedIds.splice(idx,1); r.likes=Math.max(0,(r.likes||0)-1); }
  else { likedIds.push(rid); r.likes=(r.likes||0)+1; }
  ls.set('likedCommentIds',likedIds);
  /* 同步到后端 */
  api.post('/comments/'+rid+'/like',{});
  renderComments();
}
function showReplyInput(cid){
  document.querySelectorAll('.reply-input-box').forEach(function(b){ b.classList.remove('show'); });
  var box=document.getElementById('replyBox_'+cid); if(box){ box.classList.add('show'); box.querySelector('input').focus(); }
}
function sendReply(cid){
  var input=document.getElementById('replyInput_'+cid); var text=input.value.trim();
  if(!text){ toast('先写点什么吧'); return; }
  var list=ls.get('comments_'+state.currentCorner.id,[]);
  var cm=list.find(function(c){ return c.id===cid; });
  if(!cm){ /* 种子评论：克隆到本地再添加回复 */ cm=seedComments.find(function(c){ return c.id===cid; }); cm=JSON.parse(JSON.stringify(cm)); list.push(cm); }
  if(!cm.replies) cm.replies=[];
  var reply={id:'rpl_'+Date.now(),user:'我',text:text,time:'刚刚',likes:0};
  cm.replies.push(reply);
  ls.set('comments_'+state.currentCorner.id,list.slice(0,50));
  /* 同步到后端 */
  api.post('/comments',{cornerId:state.currentCorner.id,parentId:cid,text:text,user:'我'});
  renderComments(); toast('回复成功 💬');
}
function sendComment(){
  var input=document.getElementById('commentInput'); var text=input.value.trim();
  if(!text){ toast('先写点什么吧'); return; }
  var c=state.currentCorner; var list=ls.get('comments_'+c.id,[]);
  list.unshift({id:'cmt_'+Date.now(),cornerId:c.id,user:'我',text:text,time:'刚刚',likes:0,replies:[]});
  ls.set('comments_'+c.id,list.slice(0,50));
  input.value='';
  /* 同步到后端 */
  api.post('/comments',{cornerId:c.id,text:text,user:'我'});
  renderComments(); toast('留言已发送 ❤');
}

/* ---- 打卡卡片 ---- */
function goCheckin(){
  navigate('checkin');
  state.checkinPhoto=null;
  state.checkinDistance=null;
  state.checkinMode='strict';
  var area=document.getElementById('uploadArea');
  area.classList.remove('has-img');
  area.innerHTML='<svg class="up-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg><div class="up-text">点击上传 / 拍摄一张现场照片</div><input type="file" id="photoInput" accept="image/*" style="display:none">';
  bindPhotoInput();
  drawCard();
  checkDistance();
}

/* ---- 到店距离核验（design D5：200m 严格 + 1km 宽松降级） ---- */
function checkDistance(){
  var c=state.currentCorner; if(!c) return;
  var st=document.getElementById('distanceStatus');
  var tx=document.getElementById('distanceText');
  st.className='distance-status checking';
  tx.textContent='正在获取定位…';

  if(!navigator.geolocation){
    /* 无 geolocation 能力，降级为宽松模式 */
    simulateDistance(c, null);
    return;
  }
  navigator.geolocation.getCurrentPosition(function(pos){
    var dist=haversine(pos.coords.latitude, pos.coords.longitude, c.lat, c.lng);
    updateDistanceStatus(dist);
  }, function(err){
    /* 定位失败，降级到上海·人民广场（spec scenario） */
    simulateDistance(c, null);
  }, {timeout:5000, enableHighAccuracy:true});
}
function simulateDistance(c, forcedDist){
  /* Demo 降级：模拟一个距离（基于 corner 的 distanceText 估算） */
  var dist = forcedDist!==null ? forcedDist : (150 + Math.floor(Math.random()*800));
  updateDistanceStatus(dist);
}
function updateDistanceStatus(dist){
  state.checkinDistance=dist;
  var st=document.getElementById('distanceStatus');
  var tx=document.getElementById('distanceText');
  if(dist<=200){
    state.checkinMode='strict';
    st.className='distance-status ok';
    tx.innerHTML='<strong>现场打卡 ✓</strong> · 距离角落 '+dist+'m，已通过严格核验';
  } else if(dist<=1000){
    state.checkinMode='loose';
    st.className='distance-status near';
    tx.innerHTML='<strong>附近打卡</strong> · 距离 '+dist+'m（>200m），卡片将标注"附近打卡"';
  } else {
    state.checkinMode='blocked';
    st.className='distance-status fail';
    tx.innerHTML='<strong>距离过远</strong> · 距离 '+dist+'m（>1km），请走近 '+state.currentCorner.name+' 后再打卡';
  }
  /* 若模式变化，重绘卡片以更新"附近打卡"标注 */
  drawCard();
}
function haversine(lat1,lng1,lat2,lng2){
  var R=6371000, toRad=function(d){ return d*Math.PI/180; };
  var dLat=toRad(lat2-lat1), dLng=toRad(lng2-lng1);
  var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)*Math.sin(dLng/2);
  return Math.round(R*2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}
function bindPhotoInput(){
  var inp=document.getElementById('photoInput');
  if(inp) inp.onchange=function(e){
    var f=e.target.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(ev){
      state.checkinPhoto=ev.target.result;
      var area=document.getElementById('uploadArea');
      area.classList.add('has-img');
      area.innerHTML='<img src="'+state.checkinPhoto+'">';
      drawCard();
    };
    r.readAsDataURL(f);
  };
}
document.querySelectorAll('.tpl-item').forEach(function(el){
  el.addEventListener('click',function(){
    document.querySelectorAll('.tpl-item').forEach(function(t){ t.classList.remove('active'); });
    el.classList.add('active'); state.checkinTpl=el.dataset.tpl; drawCard();
  });
});

function wrapText(ctx,text,x,y,maxW,lh){
  var chars=text.split(''); var line=''; 
  for(var i=0;i<chars.length;i++){
    var test=line+chars[i];
    if(ctx.measureText(test).width>maxW && line){ ctx.fillText(line,x,y); line=chars[i]; y+=lh; }
    else { line=test; }
  }
  ctx.fillText(line,x,y);
}

function drawCard(){
  var canvas=document.getElementById('cardCanvas'); if(!canvas) return;
  var ctx=canvas.getContext('2d'); var W=750,H=1000;
  var c=state.currentCorner; if(!c) return;
  var tpl=state.checkinTpl;
  ctx.clearRect(0,0,W,H);

  /* 背景 */
  if(tpl==='polaroid'){
    ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#f5f5f7'; ctx.fillRect(40,40,W-80,H-80);
  } else if(tpl==='ticket'){
    var g=ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,'#1a1a1a'); g.addColorStop(.6,'#2d2d3a'); g.addColorStop(1,'#3B7DD8'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    /* 票根锯齿 */
    ctx.fillStyle='#f5f5f7'; for(var i=0;i<20;i++){ ctx.beginPath(); ctx.arc(40+i*36, H-260, 12, 0, 7); ctx.fill(); }
  } else {
    var g2=ctx.createLinearGradient(0,0,W,H); g2.addColorStop(0,'#0e0e12'); g2.addColorStop(1,'#1a1a2e'); ctx.fillStyle=g2; ctx.fillRect(0,0,W,H);
    /* 胶片孔洞 */
    ctx.fillStyle='#333'; for(var j=0;j<12;j++){ ctx.fillRect(0, 60+j*70, 24, 40); ctx.fillRect(W-24, 60+j*70, 24, 40); }
  }

  /* 照片区 */
  var px=60,py=60,pw=W-120,ph=tpl==='ticket'?500:520;
  ctx.fillStyle = tpl==='polaroid'?'#e8e8ec':'rgba(255,255,255,.08)';
  ctx.fillRect(px,py,pw,ph);

  var finish=function(photo){
    if(photo){
      try{
         ctx.save(); ctx.beginPath();
         if(tpl==='polaroid'){ ctx.rect(px,py,pw,ph); }
         else {
           var rr=16;
           ctx.moveTo(px+rr, py); ctx.lineTo(px+pw-rr, py); ctx.quadraticCurveTo(px+pw, py, px+pw, py+rr);
           ctx.lineTo(px+pw, py+ph-rr); ctx.quadraticCurveTo(px+pw, py+ph, px+pw-rr, py+ph);
           ctx.lineTo(px+rr, py+ph); ctx.quadraticCurveTo(px, py+ph, px, py+ph-rr);
           ctx.lineTo(px, py+rr); ctx.quadraticCurveTo(px, py, px+rr, py); ctx.closePath();
         }
         ctx.clip();
        var r=Math.max(pw/photo.width, ph/photo.height);
        var dw=photo.width*r, dh=photo.height*r;
        ctx.drawImage(photo, px+(pw-dw)/2, py+(ph-dh)/2, dw, dh);
        ctx.restore();
      }catch(e){}
    } else {
      /* 无照片时绘制歌词大字装饰 */
      ctx.save();
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.font='bold 70px -apple-system,sans-serif';
      ctx.fillStyle = tpl==='polaroid'?'rgba(0,0,0,.06)':(tpl==='ticket'?'rgba(255,255,255,.08)':'rgba(255,255,255,.06)');
      ctx.translate(px+pw/2, py+ph/2);
      ctx.rotate(-0.15);
      wrapText(ctx, c.lyric, -pw/2+20, 0, pw-40, 86);
      ctx.restore();
    }

    /* 模板专属装饰 */
    if(tpl==='ticket'){
      ctx.strokeStyle='rgba(255,255,255,.15)'; ctx.lineWidth=2; ctx.setLineDash([12,8]);
      ctx.beginPath(); ctx.moveTo(60, H-280); ctx.lineTo(W-60, H-280); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle='rgba(255,255,255,.9)'; ctx.font='bold 22px -apple-system,sans-serif'; ctx.textAlign='left';
      ctx.fillText('ADMIT ONE', 70, H-245);
      ctx.textAlign='right'; ctx.fillText(c.city.toUpperCase(), W-70, H-245);
    }

    /* 五球装饰 */
    var bc=['#3B7DD8','#4ECDC4','#FFD23F','#FF6B9D','#9B7EDE'];
    var by = tpl==='ticket'?H-200:H-190;
    bc.forEach(function(col,i){ ctx.fillStyle=col; ctx.beginPath(); ctx.arc(90+i*32, by, 10, 0, 7); ctx.fill(); });

    /* 文字 */
    ctx.textAlign='left';
    var tc = tpl==='film'?'#fff':(tpl==='ticket'?'#fff':'#1a1a1a');
    ctx.fillStyle=tc;
    ctx.font='bold 40px -apple-system,sans-serif';
    wrapText(ctx, '「'+c.lyric+'」', 60, H-145, W-120, 54);

    ctx.font='600 24px -apple-system,sans-serif';
    ctx.fillStyle = tpl==='film'?'rgba(255,255,255,.7)':(tpl==='ticket'?'rgba(255,255,255,.8)':'#999');
    ctx.fillText('— '+c.song, 60, H-70);

    var d=new Date();
    var ds=d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0');
    ctx.textAlign='right'; ctx.fillText(ds, W-60, H-70);

    ctx.textAlign='left'; ctx.font='600 22px -apple-system,sans-serif';
    ctx.fillText('@ '+c.name+' · '+c.city, 60, H-34);

    ctx.textAlign='right'; ctx.font='600 16px -apple-system,sans-serif';
    ctx.fillStyle = tpl==='film'?'rgba(255,255,255,.5)':'#bbb';
    ctx.fillText('MaydayLand', W-60, H-34);

    /* 附近打卡标注（design D5：1km 宽松圈标记） */
    if(state.checkinMode==='loose'){
      ctx.fillStyle='rgba(255,210,63,.9)';
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(60, H-95, 130, 28, 14) : (function(){
        ctx.rect(60, H-95, 130, 28);
      })();
      ctx.fill();
      ctx.fillStyle='#1a1a1a'; ctx.font='600 16px -apple-system,sans-serif'; ctx.textAlign='left';
      ctx.fillText('📍 附近打卡', 70, H-76);
    }

    /* 小程序码（checkin-card spec：卡片底部含小程序码，path 携带 cornerId） */
    var qrX=W-130, qrY=H-130, qrS=70;
    ctx.fillStyle='#fff';
    ctx.fillRect(qrX-4, qrY-4, qrS+8, qrS+8);
    ctx.fillStyle='#1a1a1a';
    var qrGrid=10, cell=qrS/qrGrid;
    var seed=c.id.charCodeAt(c.id.length-1)+c.id.charCodeAt(c.id.length-2);
    for(var qy=0;qy<qrGrid;qy++){
      for(var qx=0;qx<qrGrid;qx++){
        if(((qx*7+qy*13+seed)%3)>0){
          ctx.fillRect(qrX+qx*cell, qrY+qy*cell, cell, cell);
        }
      }
    }
    /* 三个定位角 */
    [[0,0],[qrGrid-3,0],[0,qrGrid-3]].forEach(function(p){
      ctx.fillStyle='#fff'; ctx.fillRect(qrX+p[0]*cell, qrY+p[1]*cell, 3*cell, 3*cell);
      ctx.fillStyle='#1a1a1a'; ctx.fillRect(qrX+p[0]*cell, qrY+p[1]*cell, 3*cell, 3*cell);
      ctx.fillStyle='#fff'; ctx.fillRect(qrX+(p[0]+0.5)*cell, qrY+(p[1]+0.5)*cell, 2*cell, 2*cell);
      ctx.fillStyle='#1a1a1a'; ctx.fillRect(qrX+(p[0]+1)*cell, qrY+(p[1]+1)*cell, cell, cell);
    });
    ctx.fillStyle = tpl==='film'?'rgba(255,255,255,.6)':'#999';
    ctx.font='500 11px -apple-system,sans-serif'; ctx.textAlign='center';
    ctx.fillText('扫码打卡', qrX+qrS/2, qrY+qrS+14);
  };

  if(state.checkinPhoto){
    var im=new Image();
    im.onload=function(){ finish(im); };
    im.onerror=function(){ finish(null); };
    im.src=state.checkinPhoto;
  } else { finish(null); }
}

function addFootprint(){
  var c=state.currentCorner; if(!c) return;
  var fp=ls.get('footprints',[]);
  /* checkin-card spec：本地记录上限 50 条，超出滚动归档 */
  if(fp.length>=50){
    var archived=ls.get('footprints_archived',[]);
    archived.unshift(fp[fp.length-1]);
    ls.set('footprints_archived',archived.slice(0,200));
    fp=fp.slice(0,49);
  }
  if(!fp.some(function(f){ return f.cornerId===c.id; })){
    fp.unshift({cornerId:c.id,cornerName:c.name,city:c.city,song:c.song,lyric:c.lyric,imageId:c.imageId,date:new Date().toISOString().slice(0,10),mode:state.checkinMode||'strict'});
    ls.set('footprints',fp);
    /* 同步到后端 */
    api.post('/footprints',{cornerId:c.id,mode:state.checkinMode||'strict',tpl:state.checkinTpl||'polaroid'});
    checkSongUnlock('checkin');
  }
}
function saveCard(){
  if(state.checkinMode==='blocked'){ toast('距离过远，请走近角落后再打卡'); return; }
  var canvas=document.getElementById('cardCanvas');
  try{
    var link=document.createElement('a');
    link.download='maydayland-'+(state.currentCorner?state.currentCorner.id:'card')+'.png';
    link.href=canvas.toDataURL('image/png');
    link.click();
    addFootprint(); toast('卡片已保存，打卡足迹+1 ❤'); confetti();
  }catch(e){
    toast('已生成打卡卡片'); addFootprint();
  }
}
function shareCard(){
  if(state.checkinMode==='blocked'){ toast('距离过远，请走近角落后再打卡'); return; }
  var c=state.currentCorner;
  var text='我在'+c.city+' '+c.name+'，遇见一句「'+c.lyric+'」。MaydayLand 等你来';
  document.getElementById('shareText').textContent=text;
  document.getElementById('shareTextBox').style.display='block';
  ls.set('shareCount', ls.get('shareCount',0)+1);
  api.put('/user/stat',{shareCount:ls.get('shareCount',0)});
  checkSongUnlock('share');
  if(navigator.share){
    navigator.share({title:'MaydayLand · 五月天城市漫游', text:text}).then(function(){ toast('分享成功 ❤'); confetti(); }).catch(function(){});
  } else {
    try{ navigator.clipboard.writeText(text); toast('文案已复制，去分享给好友吧～'); confetti(); }catch(e){ toast('分享文案已生成'); }
  }
  addFootprint();
}
function shareCorner(){
  var c=state.currentCorner;
  var text='我在'+c.city+' '+c.name+'，遇见一句「'+c.lyric+'」。MaydayLand 等你来';
  if(navigator.share){
    navigator.share({title:'MaydayLand', text:text}).catch(function(){});
  } else {
    try{ navigator.clipboard.writeText(text); toast('文案已复制～'); }catch(e){ toast(text); }
  }
}

/* ---- 五迷暗号核销 ---- */
function openPasscodeModal(){
  var c=state.currentCorner;
  var token='ML'+Date.now().toString(36).toUpperCase()+Math.random().toString(36).slice(2,6).toUpperCase();
  var exp=Date.now()+600000;
  document.getElementById('passcodeModal').classList.add('show');
  document.getElementById('passcodeModalContent').innerHTML=
    '<div class="modal-title">五迷暗号核销</div>'+
    '<div class="modal-sub">向店家出示二维码，核销后解锁「'+c.song+'」徽章</div>'+
    '<canvas class="qr-canvas" id="qrCanvas" width="180" height="180"></canvas>'+
    '<div class="modal-countdown" id="countdown">有效期：10:00</div>'+
    '<button class="modal-btn" onclick="verifyPasscode()">模拟商家核销</button>'+
    '<button class="modal-btn outline" onclick="closePasscodeModal()">取消</button>';
  renderQR(token);
  startCountdown(exp);
  state._token=token; state._exp=exp;
}
function renderQR(token){
  var cv=document.getElementById('qrCanvas'); if(!cv) return;
  var ctx=cv.getContext('2d');
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,180,180);
  ctx.fillStyle='#1a1a1a';
  var grid=21, cell=180/grid;
  for(var y=0;y<grid;y++){
    for(var x=0;x<grid;x++){
      var h=((x*31+y*17+token.charCodeAt((x+y)%token.length))%7);
      if(h>3) ctx.fillRect(x*cell, y*cell, cell, cell);
    }
  }
  /* 三个定位角 */
  [[0,0],[grid-7,0],[0,grid-7]].forEach(function(p){
    ctx.fillStyle='#fff'; ctx.fillRect(p[0]*cell, p[1]*cell, 7*cell, 7*cell);
    ctx.fillStyle='#1a1a1a'; ctx.fillRect(p[0]*cell, p[1]*cell, 7*cell, 7*cell);
    ctx.fillStyle='#fff'; ctx.fillRect((p[0]+1)*cell, (p[1]+1)*cell, 5*cell, 5*cell);
    ctx.fillStyle='#1a1a1a'; ctx.fillRect((p[0]+2)*cell, (p[1]+2)*cell, 3*cell, 3*cell);
  });
}
function startCountdown(exp){
  if(state.countdownTimer) clearInterval(state.countdownTimer);
  state.countdownTimer=setInterval(function(){
    var left=Math.max(0, exp-Date.now());
    var s=Math.floor(left/1000);
    var mm=String(Math.floor(s/60)).padStart(2,'0');
    var ss=String(s%60).padStart(2,'0');
    var el=document.getElementById('countdown');
    if(el) el.textContent='有效期：'+mm+':'+ss;
    if(left<=0){ clearInterval(state.countdownTimer); closePasscodeModal(); toast('暗号已过期，请重新生成'); }
  },1000);
}
function verifyPasscode(){
  var c=state.currentCorner;
  /* fan-passcode spec：单用户在同一角落每日仅可成功核销 1 次 */
  var today=new Date().toISOString().slice(0,10);
  var passcodeLog=ls.get('passcodeLog',[]);
  var alreadyVerified=passcodeLog.some(function(l){ return l.cornerId===c.id && l.date===today; });
  if(alreadyVerified){
    if(state.countdownTimer) clearInterval(state.countdownTimer);
    document.getElementById('passcodeModalContent').innerHTML=
      '<div class="modal-title" style="color:var(--pink)">今日已对过暗号</div>'+
      '<div class="modal-sub">「'+c.song+'」徽章今日已解锁，明天再来吧～</div>'+
      '<button class="modal-btn" onclick="closePasscodeModal()">知道了</button>';
    return;
  }
  var badges=ls.get('badges',[]);
  var isNew=false;
  if(!badges.some(function(b){ return b.song===c.song; })){
    badges.push({song:c.song, city:c.city, unlockedAt:today});
    ls.set('badges',badges);
    isNew=true;
  }
  /* 记录核销日志 */
  passcodeLog.push({cornerId:c.id, song:c.song, date:today, ts:Date.now()});
  ls.set('passcodeLog',passcodeLog.slice(0,200));
  /* 同步到后端 */
  api.post('/passcode-logs',{cornerId:c.id,passcode:c.passcode});
  checkSongUnlock('passcode');
  if(state.countdownTimer) clearInterval(state.countdownTimer);
  document.getElementById('passcodeModalContent').innerHTML=
    '<div class="modal-success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div>'+
    '<div class="modal-title">核销成功！</div>'+
    '<div class="modal-sub">'+(isNew?'🎉 首次解锁':'已拥有')+'「'+c.song+'」五迷徽章<br>到「我的」页查看徽章墙</div>'+
    '<button class="modal-btn" onclick="closePasscodeModal()">太棒了</button>';
  if(isNew){ setTimeout(function(){ confetti(); }, 300); }
}

/* ---- 轻量庆祝动画 ---- */
function confetti(){
  var stage=document.getElementById('stage');
  var colors=['#3B7DD8','#FF6B9D','#FFD23F','#4ECDC4','#9B7EDE'];
  var rect=stage.getBoundingClientRect();
  var ox=rect.left+rect.width/2, oy=rect.top+rect.height/2;
  for(var i=0;i<40;i++){
    (function(idx){
      var p=document.createElement('div');
      p.style.cssText='position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:600;background:'+colors[idx%5];
      var x=ox, y=oy;
      p.style.left=x+'px'; p.style.top=y+'px';
      document.body.appendChild(p);
      var vx=(Math.random()-.5)*12, vy=(Math.random()-1)*14, g=.8;
      var life=0;
      var anim=setInterval(function(){
        life++;
        x+=vx; y+=vy; vy+=g;
        p.style.left=x+'px'; p.style.top=y+'px'; p.style.opacity=Math.max(0,1-life/60);
        if(life>60){ clearInterval(anim); p.remove(); }
      },16);
    })(i);
  }
}
function closePasscodeModal(){
  document.getElementById('passcodeModal').classList.remove('show');
  if(state.countdownTimer) clearInterval(state.countdownTimer);
}

/* ---- 演唱会页 ---- */
function renderConcert(){
  var posterMap={1015:img(1015),1018:img(1018),1044:img(1044),1036:img(1036)};
  var cc=concerts.filter(function(c){ return c.city===state.currentCity; });
  var listEl=document.getElementById('concertList');
  listEl.className='fade-in';
  if(!cc.length){
    listEl.innerHTML='<div class="empty" style="padding:40px 20px"><div style="font-size:36px;margin-bottom:8px">🎫</div>当前城市暂无演唱会安排，切换城市看看～</div>';
  } else {
    listEl.innerHTML=cc.map(function(c){
      return '<div class="concert-item" onclick="navigateConcert(\''+c.id+'\')">'+
        '<img class="concert-poster" src="'+(posterMap[c.posterId]||img(c.posterId))+'" alt="">'+
        '<div class="concert-info"><div class="ci-city">'+c.city+'</div>'+
        '<div class="ci-venue">'+c.venue+'</div><div class="ci-date">'+c.dateText+'</div>'+
        '<span class="ci-status '+c.status+'">'+c.statusLabel+'</span></div></div>';
    }).join('');
  }
  setTimeout(function(){ listEl.classList.remove('fade-in'); }, 220);
  document.getElementById('newsList').innerHTML=news.map(function(n){
    return '<div class="news-item"><span class="news-type '+n.type+'">'+n.typeLabel+'</span>'+
      '<div class="news-title">'+n.title+'</div>'+
      '<div class="news-summary">'+n.summary+'</div>'+
      '<div class="news-time">'+n.time+'</div></div>';
  }).join('');
}

/* ---- 演唱会详情页 ---- */
function navigateConcert(concertId){
  state.currentConcert=concerts.find(function(c){ return c.id===concertId; });
  if(!state.currentConcert) return;
  showPage('concert-detail');
  state.stack.push('concert-detail');
  renderConcertDetail();
}
function renderConcertDetail(){
  var c=state.currentConcert; if(!c) return;
  document.getElementById('concertDetailImg').src=img(c.posterId);
  document.getElementById('concertDetailCity').textContent=c.city+' · '+c.statusLabel;
  document.getElementById('concertDetailVenue').textContent=c.venue;
  document.getElementById('concertDetailDate').textContent=c.dateText;
  document.getElementById('concertDetailStatus').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'+c.venue+' · '+c.city;
  document.getElementById('concertDetailHighlight').textContent=c.highlight;
  document.getElementById('venueMapTitle').textContent=c.venue+' 周边';
  renderVenueMap(c);
  renderTonightMsgs(c);
}
function renderVenueMap(c){
  /* 找同城市的角落作为周边 1km 标记（Demo 用同城市近似） */
  var nearby=corners.filter(function(co){ return co.city===c.city; }).slice(0,8);
  document.getElementById('nearbyCornerCount').textContent=nearby.length+' 个';
  /* SVG 地图：场馆在中心，角落散布 */
  var pos=[[80,60],[280,70],[100,140],[260,150],[60,100],[320,110],[180,40],[200,180]];
  var colors=['#3B7DD8','#FF6B9D','#FFD23F','#4ECDC4','#9B7EDE'];
  var pins='<circle cx="175" cy="110" r="12" fill="#1a1a1a" stroke="#fff" stroke-width="3"/>';
  pins+='<text x="175" y="114" text-anchor="middle" font-size="10" fill="#fff" font-weight="bold">🎤</text>';
  pins+=nearby.map(function(co,i){
    var p=pos[i%pos.length];
    return '<g class="map-pin" onclick="navigate(\'corner\',\''+co.id+'\')">'+
      '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="7" fill="'+colors[i%5]+'" stroke="#fff" stroke-width="2"/>'+
      '<text x="'+p[0]+'" y="'+(p[1]+3)+'" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">'+(i+1)+'</text></g>';
  }).join('');
  document.getElementById('venueMapPins').innerHTML=pins;
  /* 周边角落列表 */
  document.getElementById('nearbyCornerList').innerHTML=nearby.map(function(co,i){
    return '<div class="nearby-corner-item" onclick="navigate(\'corner\',\''+co.id+'\')">'+
      '<img class="nearby-corner-thumb" src="'+img(co.imageId,co.song)+'">'+
      '<div class="nearby-corner-info"><div class="nci-name">'+co.name+'</div>'+
      '<div class="nci-lyric">「'+co.lyric+'」— '+co.song+'</div>'+
      '<div class="nci-dist">'+co.distanceText+'</div></div></div>';
  }).join('');
}

/* ---- 今晚同场 ---- */
function isConcertWindow(c){
  /* Demo：已收官的演唱会显示历史留言（只读），即将开演的若在窗口内可发言 */
  if(c.status==='ended') return false;
  /* 简化：将即将开演的视为在窗口内（Demo 体验） */
  return true;
}
function renderTonightMsgs(c){
  var list=ls.get('tonight_'+c.id,[]);
  var inWindow=isConcertWindow(c);
  var tag=document.getElementById('tonightTag');
  var inputWrap=document.getElementById('tonightInputWrap');
  if(c.status==='ended'){
    tag.textContent='历史留言';
    tag.classList.add('ended');
    inputWrap.classList.add('disabled');
    document.getElementById('tonightInput').placeholder='演出已结束，留言为只读';
  } else if(inWindow){
    tag.textContent='今晚同场 · 留言中';
    tag.classList.remove('ended');
    inputWrap.classList.remove('disabled');
    document.getElementById('tonightInput').placeholder='留下今晚的现场心声（≤200字）…';
  } else {
    tag.textContent='未开始';
    tag.classList.add('ended');
    inputWrap.classList.add('disabled');
  }
  document.getElementById('tonightCount').textContent=list.length+' 条留言';
  var colors=['#3B7DD8','#FF6B9D','#FFD23F','#4ECDC4','#9B7EDE'];
  var seedMsgs=[
    {name:'台北阿信女孩',text:'位置在 3F 215 区，有同区的五迷吗！',time:'17:42'},
    {name:'倔强的番茄',text:'接驳车已到，现场周边超美，水立方胡萝卜麦克风必打卡',time:'17:55'},
    {name:'知足的鱼',text:'带了自己做的应援手幅，期待《倔强》大合唱！',time:'18:10'}
  ];
  var allMsgs = c.status==='ended' ? (list.length?list:seedMsgs) : list;
  document.getElementById('tonightMsgs').innerHTML = allMsgs.length ? allMsgs.map(function(m,i){
    return '<div class="tonight-msg"><div class="tonight-avatar" style="background:'+colors[i%5]+'">'+(m.name[0]||'五')+'</div>'+
      '<div class="tonight-msg-text"><strong>'+m.name+'</strong>'+m.text+'<br><span>'+m.time+'</span></div></div>';
  }).join('') : '<div class="empty" style="padding:16px">还没有留言，做第一个发声的五迷吧～</div>';
}
function sendTonightMsg(){
  var c=state.currentConcert; if(!c) return;
  if(c.status==='ended' || !isConcertWindow(c)){ toast('当前不在留言窗口'); return; }
  var input=document.getElementById('tonightInput'); var text=input.value.trim();
  if(!text){ toast('先写点什么吧'); return; }
  if(text.length>200){ toast('留言不超过 200 字'); return; }
  var list=ls.get('tonight_'+c.id,[]);
  var now=new Date();
  list.unshift({name:'我',text:text,time:now.getHours()+':'+String(now.getMinutes()).padStart(2,'0')});
  ls.set('tonight_'+c.id,list.slice(0,50));
  input.value=''; renderTonightMsgs(c); toast('留言已发送 ❤');
}

/* ---- 我的页 ---- */
function renderMine(){
  var fp=ls.get('footprints',[]);
  var badges=ls.get('badges',[]);
  var shareCount=ls.get('shareCount',0);
  var cities={};
  fp.forEach(function(f){ cities[f.city]=1; });
  document.getElementById('statFootprint').textContent=fp.length;
  document.getElementById('statBadge').textContent=badges.length;
  document.getElementById('statCity').textContent=Object.keys(cities).length;
  document.getElementById('statShare').textContent=shareCount;

  /* 足迹 */
  var fpEl=document.getElementById('footprintList');
  var archived=ls.get('footprints_archived',[]);
  if(fp.length){
    fpEl.innerHTML=fp.map(function(f){
      var modeTag = f.mode==='loose' ? '<span class="fi-mode">附近打卡</span>' : '';
      return '<div class="footprint-item"><img class="footprint-thumb" src="'+img(f.imageId,f.song)+'">'+
        '<div class="footprint-info"><div class="fi-name">'+f.cornerName+' '+modeTag+'</div>'+
        '<div class="fi-lyric">「'+f.lyric+'」— '+f.song+'</div>'+
        '<div class="fi-meta">'+f.city+' · '+f.date+'</div></div></div>';
    }).join('');
    /* 50 条上限归档提示（checkin-card spec） */
    if(archived.length){
      fpEl.innerHTML+='<div class="archive-tip">已归档 '+archived.length+' 条早期足迹（本地仅保留最近 50 条）</div>';
    } else if(fp.length>=45){
      fpEl.innerHTML+='<div class="archive-tip">足迹即将达到 50 条上限，超出将自动归档</div>';
    }
  } else {
    fpEl.innerHTML='<div class="empty">还没有打卡足迹，去发现页开启第一站吧～</div>';
  }

  /* 徽章墙 */
  var unlocked={};
  badges.forEach(function(b){ unlocked[b.song]=1; });
  document.getElementById('badgeGrid').innerHTML=allBadges.map(function(b){
    var on=unlocked[b.song];
    return '<div class="badge-cell '+(on?'':'locked')+'" style="'+(on?'background:'+b.color:'')+'">'+
      '<div class="bc-icon">'+(on?b.icon:'🔒')+'</div>'+
      '<div>'+b.song+'</div></div>';
  }).join('');

  /* v1.1：歌单解锁 */
  renderSongUnlock();

  /* 我的推荐 */
  var sc=ls.get('submittedCorners',[]);
  var scEl=document.getElementById('submittedList');
  if(sc.length){
    scEl.innerHTML=sc.map(function(s){
      return '<div class="footprint-item"><div class="footprint-thumb" style="background:linear-gradient(135deg,#3B7DD8,#FF6B9D);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px">📍</div>'+
        '<div class="footprint-info"><div class="fi-name">'+s.name+'</div>'+
        '<div class="fi-lyric">「'+s.lyric+'」</div>'+
        '<div class="fi-meta">'+s.city+' · '+s.address+' · 审核中</div></div></div>';
    }).join('');
  } else {
    scEl.innerHTML='<div class="empty">还没推荐过角落，去发现页右下角添加吧～</div>';
  }
}

/* ---- 首次引导 ---- */
function showGuide(){
  if(!ls.get('guideShown',false)){
    setTimeout(function(){ document.getElementById('guideMask').classList.add('show'); }, 1800);
  }
}

/* ---- v1.1：歌单解锁 ---- */
function renderSongUnlock(){
  var unlockedSongs=ls.get('unlockedSongs',[]);
  /* 统计 */
  var totalSongs=0, unlockedCount=0;
  songUnlockConfig.forEach(function(a){ totalSongs+=a.songs.length; a.songs.forEach(function(s){ if(unlockedSongs.indexOf(s.name)>=0) unlockedCount++; }); });
  document.getElementById('songUnlockProgress').textContent=unlockedCount+' / '+totalSongs;
  /* 下一首解锁提示 */
  var nextTip=getNextUnlockTip(unlockedSongs);
  document.getElementById('songUnlockNextTip').textContent=nextTip;
  /* 渲染分组网格 */
  var html=songUnlockConfig.map(function(a){
    return '<div class="album-group"><div class="album-name">'+a.album+'</div><div class="song-grid">'+
      a.songs.map(function(s){
        var on=unlockedSongs.indexOf(s.name)>=0;
        var tip=getSongUnlockTip(s);
        return '<div class="song-cell '+(on?'unlocked':'locked')+'" style="'+(on?'background:'+s.color:'')+'" onclick="'+(on?'playSong(\''+s.name+'\')':'toast(\''+tip+'\')')+'">'+
          '<div class="sc-tooltip">'+tip+'</div>'+
          '<div class="sc-icon">'+(on?'🎵':'🔒')+'</div>'+
          '<div class="sc-name">'+s.name+'</div></div>';
      }).join('')+'</div></div>';
  }).join('');
  document.getElementById('songUnlockGrid').innerHTML=html;
}
function getSongUnlockTip(s){
  if(!s.unlock) return '继续探索 MaydayLand 解锁这首歌曲';
  var map={firstCheckin:'首次打卡任意角落解锁',checkin:'累计打卡 '+s.unlock.value+' 个角落解锁',passcode:'对暗号成功 '+s.unlock.value+' 次解锁',share:'分享 '+s.unlock.value+' 次解锁',citySwitch:'切换城市 '+s.unlock.value+' 次解锁',commentLiked:'评论被点赞 '+s.unlock.value+' 次解锁',looseCheckin:'完成 1 次附近打卡解锁',cities:'打卡 '+s.unlock.value+' 个不同城市解锁'};
  return map[s.unlock.action]||'继续探索解锁';
}
function getNextUnlockTip(unlockedSongs){
  /* 找到第一个未解锁且有解锁条件的歌曲 */
  for(var i=0;i<songUnlockConfig.length;i++){
    for(var j=0;j<songUnlockConfig[i].songs.length;j++){
      var s=songUnlockConfig[i].songs[j];
      if(s.unlock && unlockedSongs.indexOf(s.name)<0){
        return '🎯 下一首可解锁：'+s.name+' — '+getSongUnlockTip(s);
      }
    }
  }
  return '🎉 所有条件歌曲已解锁，继续探索完整歌单！';
}
function checkSongUnlock(triggerAction){
  var unlockedSongs=ls.get('unlockedSongs',[]);
  var newlyUnlocked=[];
  var fp=ls.get('footprints',[]);
  var badges=ls.get('badges',[]);
  var passcodeLog=ls.get('passcodeLog',[]);
  var shareCount=ls.get('shareCount',0);
  var citySwitchCount=ls.get('citySwitchCount',0);
  var commentLikedCount=ls.get('commentLikedCount',0);
  var cities={}; fp.forEach(function(f){ cities[f.city]=1; });
  var cityCount=Object.keys(cities).length;
  var looseCheckinCount=fp.filter(function(f){ return f.mode==='loose'; }).length;

  songUnlockConfig.forEach(function(a){
    a.songs.forEach(function(s){
      if(unlockedSongs.indexOf(s.name)>=0) return; /* 已解锁 */
      if(!s.unlock) return; /* 无解锁条件，默认锁定 */
      var cond=s.unlock;
      var met=false;
      switch(cond.action){
        case 'firstCheckin': met=fp.length>=1; break;
        case 'checkin': met=fp.length>=cond.value; break;
        case 'passcode': met=passcodeLog.length>=cond.value; break;
        case 'share': met=shareCount>=cond.value; break;
        case 'citySwitch': met=citySwitchCount>=cond.value; break;
        case 'commentLiked': met=commentLikedCount>=cond.value; break;
        case 'looseCheckin': met=looseCheckinCount>=cond.value; break;
        case 'cities': met=cityCount>=cond.value; break;
      }
      if(met){ unlockedSongs.push(s.name); newlyUnlocked.push(s); }
    });
  });

  if(newlyUnlocked.length){
    ls.set('unlockedSongs',unlockedSongs);
    /* 同步到后端 */
    newlyUnlocked.forEach(function(s){ api.post('/songs/unlock',{song:s.name,action:triggerAction}); });
    showUnlockAnimation(newlyUnlocked[0]);
    renderSongUnlock();
  }
}
function showUnlockAnimation(song){
  var overlay=document.getElementById('unlockOverlay');
  document.getElementById('unlockSongName').textContent='🎵 '+song.name;
  /* 粒子绽放 */
  var particlesEl=document.getElementById('unlockParticles');
  particlesEl.innerHTML='';
  var colors=['#3B7DD8','#FF6B9D','#FFD23F','#4ECDC4','#9B7EDE'];
  for(var i=0;i<20;i++){
    var p=document.createElement('div');
    p.className='unlock-particle';
    p.style.background=colors[i%5];
    var angle=(i/20)*Math.PI*2;
    var dist=80+Math.random()*40;
    p.style.setProperty('--tx',Math.cos(angle)*dist+'px');
    p.style.setProperty('--ty',Math.sin(angle)*dist+'px');
    p.style.animation='particleBurst 1s ease-out '+i*0.03+'s forwards';
    particlesEl.appendChild(p);
  }
  overlay.classList.add('show');
}
function closeUnlockOverlay(){
  document.getElementById('unlockOverlay').classList.remove('show');
}
function playSong(name){
  /* 试听外链：QQ 音乐搜索 */
  var qqUrl='https://y.qq.com/n/ryqq/search?w='+encodeURIComponent('五月天 '+name);
  var neteaseUrl='https://music.163.com/#/search/m/?s='+encodeURIComponent('五月天 '+name)+'&type=1';
  if(confirm('试听《'+name+'》：\n确定 - QQ音乐搜索\n取消 - 网易云音乐搜索')){
    window.open(qqUrl,'_blank');
  } else {
    window.open(neteaseUrl,'_blank');
  }
}
function closeGuide(){
  document.getElementById('guideMask').classList.remove('show');
  ls.set('guideShown',true);
}

/* ---- 推荐新角落 ---- */
function openSubmitCorner(){
  document.getElementById('passcodeModal').classList.add('show');
  document.getElementById('passcodeModalContent').innerHTML=
    '<div class="modal-title">推荐新角落</div>'+
    '<div class="modal-sub" style="text-align:left;margin-top:10px">发现还没收录的五迷据点？填写下方信息，审核通过后将加入地图。</div>'+
    '<div style="margin-top:14px;text-align:left">'+
    '<input id="scName" placeholder="地点名称" style="width:100%;padding:11px 14px;background:#f5f5f7;border-radius:12px;font-size:14px;margin-bottom:10px">'+
    '<input id="scCity" placeholder="城市" style="width:100%;padding:11px 14px;background:#f5f5f7;border-radius:12px;font-size:14px;margin-bottom:10px">'+
    '<input id="scAddr" placeholder="详细地址" style="width:100%;padding:11px 14px;background:#f5f5f7;border-radius:12px;font-size:14px;margin-bottom:10px">'+
    '<input id="scLyric" placeholder="推荐匹配的一句歌词（≤30字）" style="width:100%;padding:11px 14px;background:#f5f5f7;border-radius:12px;font-size:14px;margin-bottom:10px">'+
    '<textarea id="scReason" placeholder="推荐理由" style="width:100%;padding:11px 14px;background:#f5f5f7;border-radius:12px;font-size:14px;height:70px;resize:none"></textarea>'+
    '</div>'+
    '<button class="modal-btn" onclick="submitCorner()" style="margin-top:14px">提交审核</button>'+
    '<button class="modal-btn outline" onclick="closePasscodeModal()">取消</button>';
}
function submitCorner(){
  var name=document.getElementById('scName').value.trim();
  var city=document.getElementById('scCity').value.trim();
  var addr=document.getElementById('scAddr').value.trim();
  var lyric=document.getElementById('scLyric').value.trim();
  if(!name||!city||!addr||!lyric){ toast('请填写完整信息'); return; }
  if(lyric.length>30){ toast('歌词片段请控制在 30 字以内'); return; }
  var list=ls.get('submittedCorners',[]);
  list.unshift({name:name,city:city,address:addr,lyric:lyric,reason:document.getElementById('scReason').value.trim(),time:new Date().toISOString().slice(0,10)});
  ls.set('submittedCorners',list.slice(0,20));
  closePasscodeModal();
  toast('推荐已提交，审核通过后上线 ❤');
}

/* ---- 定位体验 ---- */
function requestLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      toast('已定位到您当前位置');
    },function(err){
      toast('定位失败，默认展示北京角落');
    },{timeout:5000});
  }
}

/* ---- 初始化 ---- */
function init(){
  /* v1.1：恢复记忆城市 */
  var savedCity=ls.get('currentCity',null);
  if(savedCity){ state.currentCity=savedCity; }
  updateCitySelector();
  renderTags();
  renderCornerList();
  renderMapPins();
  renderConcert();
  showGuide();
  requestLocation();
  /* 从后端 API 加载数据（失败则用前端常量 fallback） */
  loadRemoteData();
  /* 新用户分享落地页（share-growth spec：推荐人提示卡 + 2s 自动收起） */
  var urlParams=new URLSearchParams(window.location.search);
  var ref=urlParams.get('ref');
  if(ref){
    setTimeout(function(){ showRecommendCard(ref); }, 1800);
  }
  /* 隐藏启动页 */
  setTimeout(function(){ document.getElementById('splash').classList.add('hide'); }, 1400);
}

/* ---- 从后端 API 异步加载数据 ---- */
function loadRemoteData(){
  /* 加载角落列表 */
  api.get('/corners?city='+encodeURIComponent(state.currentCity)).then(function(data){
    if(data && data.length){ corners=data; renderCornerList(); renderMapPins(); console.log('[api] corners loaded:',data.length); }
  });
  /* 加载演唱会列表 */
  api.get('/concerts?city='+encodeURIComponent(state.currentCity)).then(function(data){
    if(data && data.length){ concerts=data; renderConcert(); console.log('[api] concerts loaded:',data.length); }
  });
  /* 加载用户统计 */
  api.get('/user/stat').then(function(data){
    if(data){
      if(data.currentCity){ state.currentCity=data.currentCity; updateCitySelector(); renderCornerList(); renderMapPins(); renderConcert(); }
      console.log('[api] user stat loaded:',data);
    }
  });
}

/* ---- v1.1：城市切换 ---- */
function updateCitySelector(){
  var cfg=cityConfig.find(function(c){ return c.name===state.currentCity; })||cityConfig[0];
  var nameEl=document.getElementById('currentCityName');
  if(nameEl){ nameEl.innerHTML='<span class="city-dot" style="background:'+cfg.color+'"></span>'+state.currentCity; }
}
function openCityPanel(){
  renderCityPanel();
  document.getElementById('cityPanelMask').classList.add('show');
  document.getElementById('cityPanel').classList.add('show');
}
function closeCityPanel(){
  document.getElementById('cityPanelMask').classList.remove('show');
  document.getElementById('cityPanel').classList.remove('show');
}
function renderCityPanel(){
  var kw=(document.getElementById('citySearchInput').value||'').trim();
  var list=cityConfig.filter(function(c){ return !kw||c.name.indexOf(kw)>=0; });
  var cornerCounts={};
  corners.forEach(function(c){ cornerCounts[c.city]=(cornerCounts[c.city]||0)+1; });
  document.getElementById('cityPanelList').innerHTML=list.map(function(c){
    var active=c.name===state.currentCity;
    return '<div class="city-card '+(active?'active':'')+'" onclick="switchCity(\''+c.name+'\')">'+
      '<div class="cc-dot" style="background:'+c.color+'">'+c.emoji+'</div>'+
      '<div class="cc-info"><div class="cc-name">'+c.name+'</div><div class="cc-count">'+(cornerCounts[c.name]||0)+' 个五迷角落</div></div>'+
      '<div class="cc-check">✓</div></div>';
  }).join('');
}
function filterCityPanel(){ renderCityPanel(); }
function switchCity(name){
  if(name===state.currentCity){ closeCityPanel(); return; }
  state.currentCity=name;
  ls.set('currentCity',name);
  var count=ls.get('citySwitchCount',0)+1; ls.set('citySwitchCount',count);
  /* 同步到后端 */
  api.put('/user/stat',{currentCity:name, citySwitchCount:count});
  /* 重新加载该城市数据 */
  api.get('/corners?city='+encodeURIComponent(name)).then(function(data){ if(data&&data.length){ corners=data; renderCornerList(); renderMapPins(); } });
  api.get('/concerts?city='+encodeURIComponent(name)).then(function(data){ if(data&&data.length){ concerts=data; renderConcert(); } });
  updateCitySelector();
  closeCityPanel();
  renderCornerList();
  renderMapPins();
  renderConcert();
  toast('已切换到 '+name+' 🏙️');
  checkSongUnlock('citySwitch');
}

/* 推荐人提示卡（share-growth spec） */
function showRecommendCard(refName){
  var card=document.getElementById('recommendCard');
  if(!card) return;
  var nameEl=card.querySelector('.rc-name');
  if(nameEl) nameEl.textContent=decodeURIComponent(refName||'某位五迷');
  card.style.display='flex';
  /* 2s 后自动收起 */
  setTimeout(function(){ card.classList.add('hide'); setTimeout(function(){ card.style.display='none'; card.classList.remove('hide'); }, 400); }, 2000);
}
function closeRecommendCard(){
  var card=document.getElementById('recommendCard');
  if(!card) return;
  card.classList.add('hide');
  setTimeout(function(){ card.style.display='none'; card.classList.remove('hide'); }, 400);
}

/* ---- 五月天全曲库人格测评（按 PRD v1.1 · 20 题 / 5 维度 ABCDE） ---- */
/* 维度映射：A=追梦者 B=治愈者 C=燃烧者 D=思想家 E=探索者 */
var quizQuestions=[
  {q:'如果你拥有一张没有终点的车票，你希望窗外的景色一直是：',opts:[
    {t:'漫无边际的蓝天和大海',type:'D'},{t:'霓虹闪烁的深夜城市',type:'C'},
    {t:'停留在落日熔金的黄昏',type:'B'},{t:'崩塌与重组的超现实景观',type:'E'}]},
  {q:'临时决定的周末夜晚，你更想：',opts:[
    {t:'冲去现场和人群一起合唱',type:'C'},{t:'和最亲近的人慢慢散步',type:'E'},
    {t:'独自开车去看城市天际线',type:'A'},{t:'找个安静地方读完一本书',type:'D'}]},
  {q:'面对"你不行"的评价，你第一反应是：',opts:[
    {t:'马上证明给他看',type:'A'},{t:'先笑笑，转身继续做自己',type:'D'},
    {t:'情绪会低落一阵，但会自我修复',type:'B'},{t:'我会问：谁定义了"行"',type:'E'}]},
  {q:'你理想中的"家"更像：',opts:[
    {t:'灯光温暖，有人等你回去',type:'B'},{t:'可以随时出发的补给站',type:'A'},
    {t:'安静稳定，书和植物很多',type:'C'},{t:'有大量留白，适合思考生命',type:'E'}]},
  {q:'倒数十秒迎接新年时，你更在意：',opts:[
    {t:'许一个更大的目标',type:'A'},{t:'抱住身边重要的人',type:'B'},
    {t:'把这一刻拍成最炸的视频',type:'C'},{t:'对过去一年真诚说谢谢',type:'D'}]},
  {q:'当你突然想起旧人旧事，会：',opts:[
    {t:'写进备忘录，不打扰谁',type:'B'},{t:'马上出门，让风吹散情绪',type:'C'},
    {t:'把它变成继续前进的动力',type:'D'},{t:'思考它为何在此刻出现',type:'E'}]},
  {q:'你在团队里更像哪种角色？',opts:[
    {t:'带头冲锋的人',type:'A'},{t:'照顾气氛与情绪的人',type:'E'},
    {t:'现场点火、负责快乐的人',type:'C'},{t:'理清逻辑与方向的人',type:'D'}]},
  {q:'你最害怕哪一种"失去"？',opts:[
    {t:'失去改变命运的机会',type:'A'},{t:'失去曾经真心的人',type:'B'},
    {t:'失去对生活的热情',type:'D'},{t:'失去自我理解的能力',type:'E'}]},
  {q:'压力爆棚时，你的解压方式是：',opts:[
    {t:'运动到大汗淋漓',type:'C'},{t:'把计划拆解并逐个完成',type:'A'},
    {t:'听歌发呆，慢慢消化',type:'B'},{t:'告诉自己再撑一下就会过',type:'E'}]},
  {q:'你对"成功"的定义更接近：',opts:[
    {t:'实现年少时的野心',type:'A'},{t:'身边的人都过得安心',type:'B'},
    {t:'每天都活得热烈尽兴',type:'C'},{t:'内心稳定并与自己和解',type:'D'}]},
  {q:'如果时间能倒流，你最想回到：',opts:[
    {t:'第一次被梦想点燃的瞬间',type:'D'},{t:'那个没说再见的夏天',type:'B'},
    {t:'和朋友通宵疯玩的夜晚',type:'C'},{t:'一个独自想通很多事的清晨',type:'E'}]},
  {q:'你更相信哪句话？',opts:[
    {t:'再难也要往前走',type:'A'},{t:'爱会在细节里发光',type:'D'},
    {t:'人生要先开心再说',type:'C'},{t:'所有答案都在路上',type:'E'}]},
  {q:'朋友失意时，你最可能说：',opts:[
    {t:'走，我陪你把它赢回来',type:'A'},{t:'你不用坚强，我在',type:'B'},
    {t:'先吃顿好的，明天再战',type:'E'},{t:'允许难过，也是成长',type:'D'}]},
  {q:'你希望别人记住你哪一面？',opts:[
    {t:'永远不服输的样子',type:'A'},{t:'真诚又柔软的心',type:'B'},
    {t:'像太阳一样有感染力',type:'C'},{t:'看透却依然温和',type:'E'}]},
  {q:'下雨天最触发你的是：',opts:[
    {t:'想起曾经并偷偷难过',type:'B'},{t:'突然想奔跑和大喊',type:'C'},
    {t:'觉得适合复盘与沉淀',type:'D'},{t:'会想到时间与命运',type:'A'}]},
  {q:'面对未知城市，你会先：',opts:[
    {t:'查好路线和节奏',type:'D'},{t:'随便走，交给偶遇',type:'C'},
    {t:'直奔地标去打卡目标',type:'E'},{t:'找一条最有故事的老街',type:'B'}]},
  {q:'当关系出现裂缝时，你通常：',opts:[
    {t:'主动沟通并争取修复',type:'A'},{t:'先共情，再慢慢靠近',type:'C'},
    {t:'不强求，顺其自然',type:'D'},{t:'思考是不是早有征兆',type:'E'}]},
  {q:'你理想中的夜晚结尾是：',opts:[
    {t:'写下明天的新目标',type:'A'},{t:'和重要的人互道晚安',type:'B'},
    {t:'音乐开到最大跳一支舞',type:'D'},{t:'关灯后还在思考宇宙与人生',type:'E'}]},
  {q:'你更向往哪种成长方式？',opts:[
    {t:'在挑战中快速蜕变',type:'A'},{t:'在陪伴中慢慢丰盈',type:'B'},
    {t:'在体验中拓宽边界',type:'C'},{t:'在理解中获得笃定',type:'E'}]},
  {q:'你最想送给未来自己的话是：',opts:[
    {t:'继续冲，你会抵达山顶',type:'A'},{t:'请一直温柔，也被温柔以待',type:'B'},
    {t:'别忘了笑，别忘了爱玩',type:'C'},{t:'慢一点没关系，真实就好',type:'D'}]}
];

/* 5 大维度人格档案（按 PRD §4.2） */
var quizPersonalities={
  A:{name:'追梦者',title:'热血/倔强',coreTag:'逆风的倔强',song:'成名在望',album:'第二人生',
    color:'#dc3320',containerBg:'#f5a99e',containerInk:'#8b2218',mascot:'red',
    member:'怪兽 · 温尚翊 · 团长 & 吉他手',archetype:'Rebellious Dreamer Archetype',
    lyric:'梦想，再見了。再見的時候，已經没有遗憾',
    subtitlePool:['你把不可能当日常训练','你相信命运可以被改写'],
    personality:'追梦者',
    desc:'你并不擅长向世界解释自己，却总在关键时刻拿出最硬的骨气。面对不确定，你会先恐惧，再行动；面对否定，你会先沉默，再坚持。你不是天生无畏，而是愿意为重要的人和事一次次站起来。你心里一直有一束光，照着那个还没实现的版本。你的人生代表曲提醒你：真正的成名，不是被看见，而是终于活成自己相信的样子。',
    traits:[{t:'热血',c:'#dc3320'},{t:'倔强',c:'#FF6B9D'},{t:'目标感',c:'#FFD23F'}],
    songs:['成名在望','倔强','放肆','顽固','后来的我们']},
  B:{name:'治愈者',title:'温柔/遗憾',coreTag:'温柔的守候',song:'温柔',album:'爱情万岁',
    color:'#e86ca5',containerBg:'#f5b8d4',containerInk:'#8b3d66',mascot:'pink',
    member:'阿信 · 陈信宏 · 主唱',archetype:'Gentle Healer Archetype',
    lyric:'不打扰，是我的温柔',
    subtitlePool:['你记得细节，也理解沉默','你用柔软承接世界的锋利'],
    personality:'治愈者',
    desc:'你拥有很强的共情力，总能在别人还没开口时先感受到情绪的波纹。你珍惜关系里的每一次靠近，也会认真对待每一次离开。你并不脆弱，只是习惯把锋芒折叠成温柔，把遗憾酿成理解。你相信爱不一定要占有，很多时候，成全也是一种深情。人生代表曲给你的答案是：温柔不是退让，而是你最坚韧的力量。',
    traits:[{t:'温柔',c:'#e86ca5'},{t:'共情',c:'#9B7EDE'},{t:'守候',c:'#4ECDC4'}],
    songs:['温柔','知足','突然好想你','好好','我不愿让你一个人']},
  C:{name:'燃烧者',title:'狂欢/当下',coreTag:'燃烧的现在',song:'离开地球表面',album:'离开地球表面 Jump!',
    color:'#efce3e',containerBg:'#f7ebb8',containerInk:'#8a7318',mascot:'yellow',
    member:'玛莎 · 蔡升晏 · 贝斯手',archetype:'Living For Now Archetype',
    lyric:'离开，离开地球表面 Jump！',
    subtitlePool:['你把日子活成现场版','你擅长把平凡点燃成烟花'],
    personality:'燃烧者',
    desc:'你对生活的感知是即时而鲜活的。你相信快乐不是等来的，而是制造出来的；你也知道，真正的勇敢是允许自己在此刻尽兴。别人眼中的你很会玩、很会闹，但只有你知道，那是你对抗麻木的方式。你的能量会感染身边的人，让他们短暂忘掉重力和烦恼。人生代表曲提醒你：拥抱当下并不浅薄，它是你认真活过的证据。',
    traits:[{t:'狂欢',c:'#efce3e'},{t:'当下',c:'#FF6B9D'},{t:'感染力',c:'#dc3320'}],
    songs:['离开地球表面','派对动物','恋爱ing','轧车','私奔到月球']},
  D:{name:'思想家',title:'豁达/哲思',coreTag:'平凡的伟大',song:'人生海海',album:'人生海海',
    color:'#29a7e1',containerBg:'#a8ddf5',containerInk:'#156a94',mascot:'blue',
    member:'冠佑 · 刘谚明 · 鼓手',archetype:'Wise Philosopher Archetype',
    lyric:'人生海海，潮落之后一定有潮起',
    subtitlePool:['你在生活褶皱里看见答案','你相信和解比输赢更重要'],
    personality:'思想家',
    desc:'你习惯把情绪放在更长的时间轴上理解，所以很少被一时的风浪击倒。你看重意义，重视秩序，也懂得在复杂里寻找简单。你不是没有锋芒，而是懂得什么时候该向前，什么时候该放下。你珍惜平凡日子的稳定与确定，也愿意在别人慌乱时给出清晰和安定。人生代表曲送给你的，是一种温和但坚定的信念。',
    traits:[{t:'豁达',c:'#29a7e1'},{t:'哲思',c:'#9B7EDE'},{t:'平和',c:'#4ECDC4'}],
    songs:['人生海海','第二人生','转眼','凡人歌','一颗苹果']},
  E:{name:'探索者',title:'宿命/深邃',coreTag:'时间的回响',song:'如烟',album:'后青春期的诗',
    color:'#22a93a',containerBg:'#a8e8b8',containerInk:'#167a2c',mascot:'green',
    member:'石头 · 石锦航 · 吉他手',archetype:'Deep Explorer Archetype',
    lyric:'有没有那么一种永远，永远不改变',
    subtitlePool:['你总在追问生命的形状','你愿意直面孤独与真实'],
    personality:'探索者',
    desc:'你天生对"为什么"更敏感，习惯在热闹之外独自思考。你不满足于表面的答案，总想看见情绪背后的因果、关系背后的本质。你可能看起来安静，内心却一直在经历深层次的对话。你知道孤独并不浪漫，但也明白它能让人更诚实地认识自己。你珍惜每一次灵魂被击中的瞬间，那些片刻会成为你继续前行的坐标。人生代表曲回应你的，是时间与生命的辽阔：你走得慢，但你看得很深。',
    traits:[{t:'深邃',c:'#22a93a'},{t:'宿命',c:'#9B7EDE'},{t:'真实',c:'#29a7e1'}],
    songs:['如烟','后青春期的诗','咸鱼','突然好想你','顽固']}
};

var quizState={step:0,answers:[],scores:{A:0,B:0,C:0,D:0,E:0}};

function startQuiz(){
  quizState={step:0,answers:[],scores:{A:0,B:0,C:0,D:0,E:0}};
  renderQuizQuestion();
}
function renderQuizQuestion(){
  var i=quizState.step;
  var total=quizQuestions.length;
  var progress=Math.round((i/total)*100);
  var q=quizQuestions[i];
  var letters=['A','B','C','D'];
  var html='<div class="quiz-question">'+
    '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:'+progress+'%"></div></div>'+
    '<div class="quiz-progress-text">第 '+(i+1)+' / '+total+' 题</div>'+
    '<div class="quiz-q-title">'+q.q+'</div>'+
    '<div class="quiz-options">'+q.opts.map(function(o,oi){
      var sel=quizState.answers[i]===oi?'selected':'';
      return '<div class="quiz-option '+sel+'" onclick="selectQuizOption('+oi+')">'+
        '<div class="quiz-option-letter">'+letters[oi]+'</div>'+
        '<div class="quiz-option-text">'+o.t+'</div></div>';
    }).join('')+'</div>'+
    '<div class="quiz-nav">'+
      (i>0?'<button class="quiz-nav-btn prev" onclick="prevQuizQuestion()">上一题</button>':'')+
      (quizState.answers[i]>=0?'<button class="quiz-nav-btn next" onclick="nextQuizQuestion()">'+(i===total-1?'查看结果 →':'下一题 →')+'</button>':'<button class="quiz-nav-btn next" style="opacity:.4" disabled>请先选择</button>')+
    '</div></div>';
  document.getElementById('quizBody').innerHTML=html;
  document.getElementById('quizScroll').scrollTop=0;
}
function selectQuizOption(idx){
  var i=quizState.step;
  var prev=quizState.answers[i];
  if(prev===idx) return;
  /* 更新分数 */
  if(prev>=0){
    var prevType=quizQuestions[i].opts[prev].type;
    quizState.scores[prevType]=Math.max(0,quizState.scores[prevType]-1);
  }
  var newType=quizQuestions[i].opts[idx].type;
  quizState.scores[newType]=(quizState.scores[newType]||0)+1;
  quizState.answers[i]=idx;
  renderQuizQuestion();
  /* 自动跳转下一题 */
  setTimeout(function(){
    if(quizState.step<quizQuestions.length-1){ nextQuizQuestion(); }
  }, 400);
}
function prevQuizQuestion(){
  if(quizState.step>0){ quizState.step--; renderQuizQuestion(); }
}
function nextQuizQuestion(){
  if(quizState.step<quizQuestions.length-1){ quizState.step++; renderQuizQuestion(); }
  else { showQuizResult(); }
}
function showQuizResult(){
  /* 按 scores 降序排序，取主+副人格（PRD §4.3） */
  var sorted=Object.keys(quizState.scores).map(function(k){
    return {key:k,score:quizState.scores[k]};
  }).sort(function(a,b){ return b.score-a.score; });
  var maxType=sorted[0].key;
  var secondType=sorted[1].key;
  /* 最低分维度作为互补型 */
  var oppositeType=sorted[sorted.length-1].key;

  var p=quizPersonalities[maxType];
  var sec=quizPersonalities[secondType];
  var opp=quizPersonalities[oppositeType];

  /* 复合标题：{副.coreTag} 的 {主.name}（PRD §4.4） */
  var comboTitle=sec.coreTag+'的'+p.name;

  /* 持久化测评结果 */
  ls.set('quizResult',{type:maxType,secondary:secondType,song:p.song,personality:p.personality,combo:comboTitle,date:new Date().toISOString().slice(0,10)});
  /* 同步到后端 */
  api.post('/quiz/result',{type:maxType,song:p.song,personality:p.personality,answers:quizState.answers});

  /* 主题色集合 */
  var mascotUrl='/static/assets/images/ui/'+p.mascot+'.png';
  var albumUrl=ALBUM_BY_SONG[p.song]||DEFAULT_ALBUM;

  /* 共鸣 Top3：取 sorted 前 3 个维度的代表曲 */
  var resonance=sorted.slice(0,3).map(function(s,i){
    var prof=quizPersonalities[s.key];
    return {song:prof.song,album:prof.album,name:prof.name,score:Math.round(s.score*5)};
  });

  var html='<div class="quiz-result">'+
    /* ===== Hero ===== */
    '<div class="quiz-result-card">'+
      '<div class="quiz-result-hero" style="background:linear-gradient(135deg,'+p.color+' 0%,'+p.containerBg+' 100%);color:'+p.containerInk+'">'+
        '<img class="quiz-result-mascot" src="'+mascotUrl+'" alt="">'+
        '<div class="quiz-result-combo">'+comboTitle+'</div>'+
        '<div class="quiz-result-archetype">'+p.archetype+'</div>'+
        '<div class="quiz-result-divider"></div>'+
        '<div class="quiz-result-label">你的人生代表曲</div>'+
        '<div class="quiz-result-song-row">'+
          '<img class="quiz-result-album" src="'+albumUrl+'" alt="">'+
          '<div class="quiz-result-song-info">'+
            '<div class="quiz-result-song">《'+p.song+'》</div>'+
            '<div class="quiz-result-album-name">'+p.album+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="quiz-result-lyric">「'+p.lyric+'」</div>'+
        '<div class="quiz-result-play" onclick="playSong(\''+p.song+'\')" style="color:'+p.color+'">▶ 试听这首歌</div>'+
      '</div>'+
      /* ===== 主人格描述 ===== */
      '<div class="quiz-result-body">'+
        '<div class="quiz-result-personality">'+p.personality+' · '+p.title+'</div>'+
        '<div class="quiz-result-coretag" style="color:'+p.color+'">「'+p.coreTag+'」</div>'+
        '<div class="quiz-result-desc">'+p.desc+'</div>'+
        '<div class="quiz-result-traits">'+p.traits.map(function(t){ return '<span class="quiz-trait" style="background:'+t.c+'20;color:'+t.c+'">'+t.t+'</span>'; }).join('')+'</div>'+

        /* ===== 副人格 + 成员卡 ===== */
        '<div class="quiz-result-section-title">🌗 副人格 · '+sec.name+'</div>'+
        '<div class="quiz-result-secondary" style="background:'+sec.containerBg+'30;border-left:4px solid '+sec.color+'">'+
          '<div class="qrs-name">'+sec.coreTag+'</div>'+
          '<div class="qrs-desc">'+sec.subtitlePool[0]+'。'+sec.subtitlePool[1]+'。</div>'+
        '</div>'+
        '<div class="quiz-result-member">'+
          '<img class="qrm-mascot" src="/static/assets/images/ui/'+p.mascot+'.png">'+
          '<div class="qrm-info">'+
            '<div class="qrm-label">五月天成员映射</div>'+
            '<div class="qrm-name">'+p.member+'</div>'+
          '</div>'+
        '</div>'+

        /* ===== 共鸣 Top3 ===== */
        '<div class="quiz-result-section-title">🎵 共鸣 Top3</div>'+
        '<div class="quiz-resonance-list">'+
          resonance.map(function(r,i){
            var albImg=ALBUM_BY_SONG[r.song]||DEFAULT_ALBUM;
            return '<div class="qres-item" onclick="playSong(\''+r.song+'\')">'+
              '<div class="qres-rank">#'+(i+1)+'</div>'+
              '<img class="qres-album" src="'+albImg+'">'+
              '<div class="qres-info"><div class="qres-song">《'+r.song+'》</div>'+
              '<div class="qres-album-name">'+r.album+' · '+r.name+'型</div></div>'+
              '<div class="qres-score" style="color:'+p.color+'">'+r.score+'分</div>'+
            '</div>';
          }).join('')+
        '</div>'+

        /* ===== 匹配 Top5 同频歌单 ===== */
        '<div class="quiz-result-section-title">🎧 匹配 Top5 · 同频歌单</div>'+
        '<div class="quiz-result-songs">'+p.songs.map(function(s,i){
          var colors=[p.color,sec.color,'#FF6B9D','#4ECDC4','#FFD23F'];
          return '<div class="quiz-result-song-cell" style="background:'+colors[i%5]+'" onclick="playSong(\''+s+'\')">'+s+'</div>';
        }).join('')+'</div>'+

        /* ===== 互补推荐 ===== */
        '<div class="quiz-result-section-title">🔄 互补推荐</div>'+
        '<div class="quiz-opposite" style="background:'+opp.containerBg+'30;border:1px dashed '+opp.color+'" onclick="playSong(\''+opp.song+'\')">'+
          '<div class="qopp-tag" style="background:'+opp.color+'">互补型</div>'+
          '<div class="qopp-song">《'+opp.song+'》</div>'+
          '<div class="qopp-desc">来自「'+opp.name+'」维度的视角，可以帮你看见自己缺失的另一面</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="quiz-result-actions">'+
      '<button class="quiz-result-btn secondary" onclick="startQuiz()">重新测评</button>'+
      '<button class="quiz-result-btn primary" style="background:#07c160" onclick="openTipModal()">请作者喝杯奶茶 🧋</button>'+
      '<button class="quiz-result-btn primary" style="background:'+p.color+'" onclick="shareQuizResult(\''+maxType+'\')">分享结果</button>'+
    '</div>'+
  '</div>';
  document.getElementById('quizBody').innerHTML=html;
  document.getElementById('quizScroll').scrollTop=0;
  /* 解锁测评相关歌曲 */
  var unlocked=ls.get('unlockedSongs',[]);
  if(unlocked.indexOf(p.song)<0){ unlocked.push(p.song); ls.set('unlockedSongs',unlocked); api.post('/songs/unlock',{song:p.song,action:'quiz'}); }
  checkSongUnlock('quiz');
}
function shareQuizResult(type){
  /* 按 PRD §6 生成测评海报（Canvas 合成），打开海报预览弹层 */
  var p=quizPersonalities[type];
  ls.set('shareCount', ls.get('shareCount',0)+1);
  api.put('/user/stat',{shareCount:ls.get('shareCount',0)});
  checkSongUnlock('share');
  openQuizPosterModal(type);
}

/* ---- 测评海报弹层 ---- */
function isWechat(){ return /MicroMessenger/i.test(navigator.userAgent||''); }

function openQuizPosterModal(type){
  var p=quizPersonalities[type];
  /* 取副人格做复合标题 */
  var sorted=Object.keys(quizState.scores).map(function(k){ return {k:k,s:quizState.scores[k]}; }).sort(function(a,b){ return b.s-a.s; });
  var sec=quizPersonalities[(sorted[1]&&sorted[1].k)||type];
  var comboTitle=sec.coreTag+'的'+p.name;

  var inWX=isWechat();
  var mask=document.getElementById('quizPosterMask');
  if(!mask){
    mask=document.createElement('div');
    mask.id='quizPosterMask';
    mask.className='qpm-mask';
    mask.innerHTML=
      '<div class="qpm-panel">'+
        '<div class="qpm-title">我的测评海报</div>'+
        '<div class="qpm-canvas-wrap">'+
          '<canvas id="quizPosterCanvas" width="720" height="1280"></canvas>'+
          '<img id="quizPosterImg" class="qpm-img" alt="测评海报，长按保存到相册">'+
        '</div>'+
        '<div class="qpm-tip" id="qpmTip">'+(inWX?'👇 长按上方海报图片，选择「保存到手机」':'长按图片保存到相册，或点击下方按钮分享')+'</div>'+
        '<div class="qpm-actions">'+
          '<button class="qpm-btn secondary" onclick="closeQuizPoster()">关闭</button>'+
          (inWX?'':'<button class="qpm-btn save" onclick="saveQuizPoster()">保存图片</button>')+
          '<button class="qpm-btn primary" onclick="shareQuizPoster()">分享</button>'+
        '</div>'+
      '</div>';
    document.body.appendChild(mask);
    mask.addEventListener('click',function(e){ if(e.target===mask) closeQuizPoster(); });
  } else {
    /* 切换状态时刷新提示 */
    var tip=document.getElementById('qpmTip');
    if(tip) tip.textContent=inWX?'👇 长按上方海报图片，选择「保存到手机」':'长按图片保存到相册，或点击下方按钮分享';
  }
  /* 重置 img，避免上一次缓存影响 */
  var oldImg=document.getElementById('quizPosterImg');
  if(oldImg){ oldImg.removeAttribute('src'); oldImg.style.display='none'; }
  var oldCanvas=document.getElementById('quizPosterCanvas');
  if(oldCanvas){ oldCanvas.style.display='block'; }

  mask.style.display='flex';
  setTimeout(function(){ mask.classList.add('show'); },10);
  drawQuizPoster(p,sec,comboTitle,function(){
    /* 绘制完成后把 canvas 转 dataURL 给 img，便于微信长按保存 */
    try{
      var canvas=document.getElementById('quizPosterCanvas');
      var img=document.getElementById('quizPosterImg');
      if(canvas && img){
        img.src=canvas.toDataURL('image/png');
        img.style.display='block';
        canvas.style.display='none';
      }
    }catch(e){ console.warn('[quiz-poster] canvas->img failed',e); }
  });
  console.log('[quiz-poster] open type=%s combo=%s wx=%s',type,comboTitle,inWX);
}

function closeQuizPoster(){
  var mask=document.getElementById('quizPosterMask');
  if(!mask) return;
  mask.classList.remove('show');
  setTimeout(function(){ mask.style.display='none'; },300);
}

function drawQuizPoster(p,sec,comboTitle,onComplete){
  var canvas=document.getElementById('quizPosterCanvas');
  if(!canvas) return;
  var W=720,H=1280;
  var ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,W,H);

  /* 1) 头部渐变背景（按主人格主题色） */
  var grad=ctx.createLinearGradient(0,0,W,H*0.55);
  grad.addColorStop(0,p.color);
  grad.addColorStop(1,p.containerBg);
  ctx.fillStyle=grad;
  ctx.fillRect(0,0,W,H*0.55);

  /* 2) 白色卡片主体 */
  ctx.fillStyle='#ffffff';
  roundRect(ctx,40,H*0.32,W-80,H-H*0.32-60,32);
  ctx.fill();

  /* 3) 顶部 logo */
  drawImageSafe('/static/assets/images/ui/%E4%BA%94%E7%89%88logo.png',function(img){
    /* logo 原图是 776x776 正方形，按比例绘制 80x80 圆形 logo（左上角） */
    if(img){
      var logoSize=72;
      var lx=42, ly=42;
      /* 白色描边圆底（提升对比度） */
      ctx.fillStyle='rgba(255,255,255,.95)';
      ctx.beginPath();
      ctx.arc(lx+logoSize/2, ly+logoSize/2, logoSize/2+4, 0, Math.PI*2);
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.arc(lx+logoSize/2, ly+logoSize/2, logoSize/2, 0, Math.PI*2);
      ctx.clip();
      ctx.drawImage(img, lx, ly, logoSize, logoSize);
      ctx.restore();
    }
    /* 标题文字（不再依赖 logo 撑场面） */
    ctx.fillStyle='#ffffff';
    ctx.font='900 30px -apple-system,system-ui,"PingFang SC",sans-serif';
    ctx.textAlign='left';
    ctx.fillText('MaydayLand', 130, 78);
    ctx.font='500 18px -apple-system,system-ui,"PingFang SC",sans-serif';
    ctx.fillStyle='rgba(255,255,255,.85)';
    ctx.fillText('五月天全曲库人格测评', 130, 108);

    /* 4) 吉祥物 */
    drawImageSafe('/static/assets/images/ui/'+p.mascot+'.png',function(mascot){
      if(mascot){
        ctx.fillStyle='rgba(255,255,255,.85)';
        ctx.beginPath(); ctx.arc(W/2,250,90,0,Math.PI*2); ctx.fill();
        ctx.drawImage(mascot,W/2-78,172,156,156);
      }
      drawPosterText();
    });
  });

  function drawPosterText(){
    /* 5) 复合标题（在白卡顶部） */
    ctx.fillStyle='#1a1a1a';
    ctx.font='900 44px -apple-system,system-ui,"PingFang SC",sans-serif';
    ctx.textAlign='center';
    ctx.fillText(comboTitle,W/2,H*0.32+72);

    /* 6) 英文原型 */
    ctx.fillStyle=p.color;
    ctx.font='600 16px Quicksand,-apple-system,sans-serif';
    ctx.fillText(p.archetype.toUpperCase(),W/2,H*0.32+104);

    /* 7) 人格 desc 前 4 句 */
    ctx.fillStyle='#555';
    ctx.font='400 22px -apple-system,system-ui,"PingFang SC",sans-serif';
    ctx.textAlign='left';
    var sentences=p.desc.split(/[。]/).filter(function(s){ return s.trim(); }).slice(0,4);
    var y=H*0.32+150;
    sentences.forEach(function(s){
      var lines=wrapLine(ctx,s+'。',W-160);
      lines.forEach(function(ln){
        ctx.fillText(ln,80,y); y+=34;
      });
    });

    /* 8) 分隔线 */
    y+=10;
    ctx.fillStyle='#eee'; ctx.fillRect(80,y,W-160,1); y+=30;

    /* 9) 人生代表曲 label */
    ctx.fillStyle='#999';
    ctx.font='600 18px -apple-system,sans-serif';
    ctx.textAlign='left';
    ctx.fillText('YOUR LIFE SONG · 人生代表曲',80,y); y+=20;

    /* 10) 专辑封面 + 歌曲信息 */
    var albumUrl=ALBUM_BY_SONG[p.song]||DEFAULT_ALBUM;
    drawImageSafe(albumUrl,function(alb){
      var albY=y+10;
      if(alb){
        ctx.save();
        roundRect(ctx,80,albY,140,140,16);
        ctx.clip();
        ctx.drawImage(alb,80,albY,140,140);
        ctx.restore();
      }
      ctx.fillStyle='#1a1a1a';
      ctx.font='900 36px -apple-system,"PingFang SC",sans-serif';
      ctx.textAlign='left';
      ctx.fillText('《'+p.song+'》',240,albY+44);
      ctx.fillStyle='#888';
      ctx.font='400 20px -apple-system,"PingFang SC",sans-serif';
      ctx.fillText(p.album,240,albY+74);
      ctx.fillStyle=p.color;
      ctx.font='600 18px -apple-system,"PingFang SC",sans-serif';
      ctx.fillText('「'+p.lyric.slice(0,18)+'」',240,albY+108);

      /* 11) 用户昵称 */
      var nick=(ls.get('quizResult',{})||{}).nickname||'五迷·同好';
      ctx.fillStyle='#999';
      ctx.font='400 18px -apple-system,sans-serif';
      ctx.textAlign='center';
      ctx.fillText('— '+nick+' 的人生代表曲 —',W/2,albY+200);

      /* 12) 底部二维码（真实图片：指向云托管域名）+ 标语 */
      drawImageSafe(ASSET+'ui/share-qrcode.png',function(qr){
        var qrSize=140, qrX=W-qrSize-60, qrY=H-qrSize-70;
        /* 二维码白底 + 圆角边框 */
        ctx.fillStyle='#fff';
        roundRect(ctx,qrX-8,qrY-8,qrSize+16,qrSize+16,12);
        ctx.fill();
        ctx.strokeStyle=p.color;
        ctx.lineWidth=2;
        roundRect(ctx,qrX-8,qrY-8,qrSize+16,qrSize+16,12);
        ctx.stroke();
        if(qr) ctx.drawImage(qr,qrX,qrY,qrSize,qrSize);
        /* 文案 */
        ctx.fillStyle='#555';
        ctx.font='600 22px -apple-system,"PingFang SC",sans-serif';
        ctx.textAlign='left';
        ctx.fillText('扫码开启你的',80,H-180);
        ctx.fillStyle=p.color;
        ctx.font='900 30px -apple-system,"PingFang SC",sans-serif';
        ctx.fillText('五月天人格测评',80,H-140);
        ctx.fillStyle='#bbb';
        ctx.font='400 14px -apple-system,sans-serif';
        ctx.fillText('MaydayLand · 跟着歌词',80,H-105);
        ctx.fillText('发现自己',80,H-85);
        /* 全部绘制完成（二维码是最后一张图） */
        if(typeof onComplete==='function') onComplete();
      });
    });
  }
}

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}

function wrapLine(ctx,text,maxWidth){
  var out=[],line='';
  for(var i=0;i<text.length;i++){
    var ch=text[i];
    if(ctx.measureText(line+ch).width>maxWidth){
      out.push(line); line=ch;
    } else line+=ch;
  }
  if(line) out.push(line);
  return out;
}

function drawImageSafe(src,cb){
  var img=new Image();
  img.crossOrigin='anonymous';
  img.onload=function(){ cb(img); };
  img.onerror=function(){ cb(null); };
  img.src=src;
}

function saveQuizPoster(){
  var canvas=document.getElementById('quizPosterCanvas');
  if(!canvas){ toast('海报未生成'); return; }
  try{
    var link=document.createElement('a');
    link.download='MaydayLand-人格测评-'+Date.now()+'.png';
    link.href=canvas.toDataURL('image/png');
    link.click();
    toast('海报已保存 📸');
    console.log('[quiz-poster] saved');
  }catch(e){
    console.error('[quiz-poster] save failed',e);
    toast('保存失败，请长按图片保存');
  }
}

function shareQuizPoster(){
  var canvas=document.getElementById('quizPosterCanvas');
  if(!canvas) return;
  var p=quizPersonalities[(ls.get('quizResult',{})||{}).type||'A'];
  var text='我的人生代表曲是《'+p.song+'》— 五月天全曲库人格测评';
  /* 优先调用 Web Share API（支持图片） */
  if(navigator.canShare && navigator.share){
    canvas.toBlob(function(blob){
      if(!blob){ shareTextOnly(); return; }
      var file=new File([blob],'maydayland-quiz.png',{type:'image/png'});
      var payload={title:'我的五月天人格测评',text:text,files:[file]};
      if(navigator.canShare(payload)){
        navigator.share(payload).then(function(){ toast('分享成功 ❤'); }).catch(function(){});
      } else {
        shareTextOnly();
      }
    },'image/png');
  } else {
    shareTextOnly();
  }
  function shareTextOnly(){
    if(navigator.share){
      navigator.share({title:'我的五月天人格测评',text:text,url:location.href}).catch(function(){});
    } else {
      try{ navigator.clipboard.writeText(text+'\n'+location.href); toast('文案已复制，去粘贴分享吧～'); }
      catch(e){ toast('请长按上方海报图片保存分享'); }
    }
  }
}

/* ---- 赞赏弹窗 ---- */
function openTipModal(){
  var m=document.getElementById('tipMask');
  if(!m) return;
  m.style.display='flex';
  setTimeout(function(){ m.classList.add('show'); },10);
  ls.set('tipShown', (ls.get('tipShown',0)|0)+1);
  console.log('[tip] open');
}
function closeTipModal(){
  var m=document.getElementById('tipMask');
  if(!m) return;
  m.classList.remove('show');
  setTimeout(function(){ m.style.display='none'; },300);
}
function saveTipQR(){
  /* 移动端通常长按图片保存，此处提示即可 */
  toast('请长按上方二维码图片，保存到相册后到微信中识别 📷');
}

init();
