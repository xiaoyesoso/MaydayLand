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
    if(['discover','concert','mine','mobile-portal'].indexOf(p)>=0){ switchTab(p); } else { showPage(p); }
  } else { switchTab('discover'); }
}
function showPage(p){
  document.querySelectorAll('.page').forEach(function(el){ el.classList.remove('active'); });
  var el=document.getElementById('page-'+p);
  if(!el) return;
  el.classList.add('active','slide-in');
  setTimeout(function(){ el.classList.remove('slide-in'); },350);
  if(['discover','concert','mine','mobile-portal'].indexOf(p)<0){ document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); }); }
  state.tab=p;
  /* 答题页隐藏底部 tabbar 与赞赏 FAB，避免遮挡固定导航；非答题页恢复 */
  var tabbar=document.querySelector('.tabbar');
  var tipFab=document.querySelector('.tip-fab');
  var isQuiz=(p==='quiz');
  if(tabbar) tabbar.classList.toggle('tabbar-hidden', isQuiz);
  if(tipFab) tipFab.classList.toggle('tip-fab-hidden', isQuiz);
  /* 答题页时 body 也隐藏 tabbar 占位 */
  if(isQuiz) document.body.classList.add('in-quiz');
  else document.body.classList.remove('in-quiz');
  if(window.portalOnShow) portalOnShow(p);
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
  var el=document.getElementById('page-'+tab);
  if(el) el.classList.add('active');
  state.stack=[tab];
  if(tab==='mine') renderMine();
  if(tab==='concert') renderConcert();
  if(tab==='mobile-portal') renderPortal();
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

/* 搜索框事件：同时监听 input / keyup / compositionend，兼容微信内置浏览器中文输入 */
(function(){
  var searchInput=document.getElementById('searchInput');
  var searchClear=document.getElementById('searchClear');
  if(!searchInput) return;
  var isComposing=false;
  function doSearch(){
    var val=searchInput.value.trim();
    state.keyword=val;
    if(searchClear) searchClear.style.display=val?'block':'none';
    renderCornerList();
  }
  searchInput.addEventListener('compositionstart',function(){ isComposing=true; });
  searchInput.addEventListener('compositionend',function(){ isComposing=false; doSearch(); });
  searchInput.addEventListener('input',function(){ if(!isComposing){ doSearch(); } });
  searchInput.addEventListener('keyup',function(e){ if(e.key==='Enter'){ doSearch(); searchInput.blur(); } });
  if(searchClear) searchClear.addEventListener('click',function(){
    state.keyword=''; searchInput.value=''; searchClear.style.display='none'; renderCornerList(); searchInput.focus();
  });
})();

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
  /* 身份信息：复用门户昵称，生成设备唯一 ID */
  var user=ls.get('portal_user',{nickname:'',avatarColor:'#425AEF'});
  var deviceId=ls.get('device_id','');
  if(!deviceId){
    deviceId='ML'+(Date.now().toString(36).toUpperCase().slice(-6))+Math.random().toString(36).toUpperCase().slice(2,5);
    ls.set('device_id',deviceId);
  }
  var nameEl=document.getElementById('profileName');
  if(nameEl){
    nameEl.textContent=user.nickname||'点击设置昵称';
    nameEl.style.cursor='pointer';
    nameEl.onclick=function(){ if(!user.nickname){ openNickModal(); } else { openNickModal(); } };
  }
  var idEl=document.getElementById('profileId');
  if(idEl) idEl.textContent='MaydayLand ID · '+deviceId;
  var avatarEl=document.getElementById('profileAvatar');
  if(avatarEl){
    avatarEl.textContent=(user.nickname||'五').charAt(0);
    avatarEl.style.background=user.avatarColor||'#425AEF';
    avatarEl.style.cursor='pointer';
    avatarEl.onclick=openNickModal;
  }

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
  {q:'如果给你一张任意门的车票，你希望窗外的风景一直是：',opts:[
    {t:'漫无边际的蓝天和大海，像离开地球表面',type:'D'},{t:'霓虹闪烁的深夜城市，派对刚刚开始',type:'C'},
    {t:'停在落日熔金的黄昏，温柔地不走',type:'B'},{t:'崩塌与重组的超现实景观，如烟般幻化',type:'E'}]},
  {q:'临时决定的周末夜晚，你更想：',opts:[
    {t:'冲去现场和人群一起合唱，疯狂到日出',type:'C'},{t:'和最亲近的人慢慢散步，今天阳光好温柔',type:'E'},
    {t:'独自开车去看城市天际线，逆风飞翔',type:'A'},{t:'找个安静地方读完一本书，写此生唯一自传',type:'D'}]},
  {q:'面对"你不行"的评价，你第一反应是：',opts:[
    {t:'我不相信那些所谓的天命，马上证明给他看',type:'A'},{t:'先笑笑，转身继续做自己',type:'D'},
    {t:'情绪会低落一阵，但会自我修复，即便失败我期待',type:'B'},{t:'我会问：谁定义了"行"',type:'E'}]},
  {q:'你理想中的"家"更像：',opts:[
    {t:'灯光温暖，有人等你回去，像知足的笑容',type:'B'},{t:'可以随时出发的补给站，奔向梦幻的疆界',type:'A'},
    {t:'安静稳定，书和植物很多，脱下长日的假面',type:'C'},{t:'有大量留白，适合思考生命，永远不天黑',type:'E'}]},
  {q:'倒数十秒迎接新年时，你更在意：',opts:[
    {t:'许一个更大的目标，成名在望',type:'A'},{t:'抱住身边重要的人，不让空气突然安静',type:'B'},
    {t:'把这一刻拍成最炸的视频，放纵去爱',type:'C'},{t:'对过去一年真诚说谢谢，人生海海',type:'D'}]},
  {q:'当你突然想起旧人旧事，会：',opts:[
    {t:'写进备忘录，不打扰谁，突然好想你',type:'B'},{t:'马上出门，让风吹散情绪，跳了跳了',type:'C'},
    {t:'把它变成继续前进的动力，逆风更适合飞翔',type:'D'},{t:'思考它为何在此刻出现，如烟般飘散',type:'E'}]},
  {q:'你在团队里更像哪种角色？',opts:[
    {t:'带头冲锋的人，将军令下不回头',type:'A'},{t:'照顾气氛与情绪的人，拥抱每一个人',type:'E'},
    {t:'现场点火、负责快乐的人，派对动物',type:'C'},{t:'理清逻辑与方向的人，步步为营',type:'D'}]},
  {q:'你最害怕哪一种"失去"？',opts:[
    {t:'失去改变命运的机会，那黑的终点是光',type:'A'},{t:'失去曾经真心的人，最怕空气突然安静',type:'B'},
    {t:'失去对生活的热情，不再疯狂到日出',type:'D'},{t:'失去自我理解的能力，找不到回家的路',type:'E'}]},
  {q:'压力爆棚时，你的解压方式是：',opts:[
    {t:'运动到大汗淋漓，离开地球表面',type:'C'},{t:'把计划拆解并逐个完成，倔强地往前',type:'A'},
    {t:'听歌发呆，慢慢消化，伤心的人别听慢歌',type:'B'},{t:'告诉自己再撑一下就会过，勇敢地飞',type:'E'}]},
  {q:'你对"成功"的定义更接近：',opts:[
    {t:'实现年少时的野心，成名在望',type:'A'},{t:'身边的人都过得安心，知足常乐',type:'B'},
    {t:'每天都活得热烈尽兴，放弃规则放纵去爱',type:'C'},{t:'内心稳定并与自己和解，此生唯一自传',type:'D'}]},
  {q:'如果时间能倒流，你最想回到：',opts:[
    {t:'第一次被梦想点燃的瞬间，回到那一天',type:'D'},{t:'那个没说再见的夏天，突然好想你',type:'B'},
    {t:'和朋友通宵疯玩的夜晚，盛夏光年',type:'C'},{t:'一个独自想通很多事的清晨，如烟散去',type:'E'}]},
  {q:'你更相信哪句话？',opts:[
    {t:'逆风的方向更适合飞翔，再难也要往前走',type:'A'},{t:'爱会在细节里发光，今天阳光好温柔',type:'D'},
    {t:'人生要先开心再说，我们都有觉悟要疯狂',type:'C'},{t:'所有答案都在路上，任意门后是新的世界',type:'E'}]},
  {q:'朋友失意时，你最可能说：',opts:[
    {t:'走，我陪你把它赢回来，将军令下',type:'A'},{t:'你不用坚强，我在，给你一个拥抱',type:'B'},
    {t:'先吃顿好的，明天再战，伤心的人别听慢歌',type:'E'},{t:'允许难过，也是成长，人生海海',type:'D'}]},
  {q:'你希望别人记住你哪一面？',opts:[
    {t:'永远不服输的样子，我和我最后的倔强',type:'A'},{t:'真诚又柔软的心，知足的笑容',type:'B'},
    {t:'像太阳一样有感染力，派对动物',type:'C'},{t:'看透却依然温和，哪朵玫瑰没有荆棘',type:'E'}]},
  {q:'下雨天最触发你的是：',opts:[
    {t:'想起曾经并偷偷难过，突然好想你',type:'B'},{t:'突然想奔跑和大喊，离开地球表面',type:'C'},
    {t:'觉得适合复盘与沉淀，步步回望',type:'D'},{t:'会想到时间与命运，如烟般飘散',type:'A'}]},
  {q:'面对未知城市，你会先：',opts:[
    {t:'查好路线和节奏，步步为营',type:'D'},{t:'随便走，交给偶遇，任意门已打开',type:'C'},
    {t:'直奔地标去打卡目标，成名在望',type:'E'},{t:'找一条最有故事的老街，外滩风光跃出课本',type:'B'}]},
  {q:'当关系出现裂缝时，你通常：',opts:[
    {t:'主动沟通并争取修复，倔强不放',type:'A'},{t:'先共情，再慢慢靠近，温柔地靠近',type:'C'},
    {t:'不强求，顺其自然，人生海海',type:'D'},{t:'思考是不是早有征兆，如烟般回望',type:'E'}]},
  {q:'你理想中的夜晚结尾是：',opts:[
    {t:'写下明天的新目标，成名在望',type:'A'},{t:'和重要的人互道晚安，知足',type:'B'},
    {t:'音乐开到最大跳一支舞，疯狂到日出',type:'D'},{t:'关灯后还在思考宇宙与人生，永远不天黑',type:'E'}]},
  {q:'你更向往哪种成长方式？',opts:[
    {t:'在挑战中快速蜕变，逆风飞翔',type:'A'},{t:'在陪伴中慢慢丰盈，拥抱彼此',type:'B'},
    {t:'在体验中拓宽边界，离开地球表面',type:'C'},{t:'在理解中获得笃定，此生唯一自传',type:'E'}]},
  {q:'你最想送给未来自己的话是：',opts:[
    {t:'继续冲，你会抵达山顶，那黑的终点是光',type:'A'},{t:'请一直温柔，也被温柔以待，今天阳光好温柔',type:'B'},
    {t:'别忘了笑，别忘了爱玩，派对动物不熄火',type:'C'},{t:'慢一点没关系，真实就好，人生海海',type:'D'}]}
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

var quizState={step:0,answers:[],scores:{A:0,B:0,C:0,D:0,E:0},direction:1};
var QUIZ_MASCOTS=[{key:'red',file:'red.png',color:'#dc3320'},{key:'pink',file:'pink.png',color:'#e86ca5'},{key:'yellow',file:'yellow.png',color:'#efce3e'},{key:'blue',file:'blue.png',color:'#29a7e1'},{key:'green',file:'green.png',color:'#22a93a'}];

function startQuiz(){
  quizState={step:0,answers:[],scores:{A:0,B:0,C:0,D:0,E:0},direction:1};
  renderQuizQuestion();
}
function renderQuizQuestion(){
  var i=quizState.step;
  var total=quizQuestions.length;
  var progress=Math.round((i/total)*100);
  var q=quizQuestions[i];
  var letters=['A','B','C','D'];
  var slideClass=quizState.direction>0?'slide-next':'slide-prev';
  /* 每题随机一只吉祥物陪伴 */
  var mascot=QUIZ_MASCOTS[Math.floor(Math.random()*QUIZ_MASCOTS.length)];
  var html='<div class="quiz-mascot-side"><img src="/static/assets/images/ui/'+mascot.file+'" alt="" style="filter:drop-shadow(0 6px 12px '+mascot.color+'40)"></div>'+
    '<div class="quiz-question '+slideClass+'">'+
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
  quizState.direction=1;
  renderQuizQuestion();
  /* 自动跳转下一题 */
  setTimeout(function(){
    if(quizState.step<quizQuestions.length-1){ nextQuizQuestion(); }
  }, 400);
}
function prevQuizQuestion(){
  if(quizState.step>0){ quizState.step--; quizState.direction=-1; renderQuizQuestion(); }
}
function nextQuizQuestion(){
  if(quizState.step<quizQuestions.length-1){ quizState.step++; quizState.direction=1; renderQuizQuestion(); }
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
    /* 绘制完成后把 canvas 转 dataURL 给 img，便于微信长按保存。
       注意：不能隐藏 canvas，否则 qpm-canvas-wrap 高度塌陷，
       position:absolute 的 img 会变成 0 高度不可见。
       img 有 z-index:2 会覆盖在 canvas 上层，canvas 保持 display:block 撑住容器高度。 */
    try{
      var canvas=document.getElementById('quizPosterCanvas');
      var img=document.getElementById('quizPosterImg');
      if(canvas && img){
        img.src=canvas.toDataURL('image/png');
        img.style.display='block';
        /* 不隐藏 canvas，让它继续撑住 wrap 高度 */
      }
    }catch(e){
      console.warn('[quiz-poster] canvas->img failed',e);
      /* toDataURL 失败（canvas 被污染）时，直接展示 canvas 本身 */
      if(canvas){ canvas.style.display='block'; }
    }
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
  /* 同源资源不强制跨域，避免微信内置浏览器因缺失 CORS 头导致加载失败 */
  try{
    var a=document.createElement('a'); a.href=src;
    if(a.hostname!==location.hostname || a.protocol!==location.protocol){
      img.crossOrigin='anonymous';
    }
  }catch(e){ img.crossOrigin='anonymous'; }
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

/* ============================================================
 * MaydayLand 移动端门户 · 8 款游戏 + 3 款工具
 * 零依赖 ES5 实现，状态走 localStorage（ml_ 前缀）
 * ============================================================ */

/* ---- 素材路径 ---- */
var GAME_ASSET = '/static/assets/MaydayLand/images/games/';
var SYN_EMOJI = [];
for (var _i = 1; _i <= 10; _i++) { SYN_EMOJI.push(GAME_ASSET + 'synthesis/emoji' + _i + '.png'); }
var TEN_EMOJI = [];
for (var _j = 1; _j <= 10; _j++) { TEN_EMOJI.push(GAME_ASSET + 'ten/emoji' + _j + '.png'); }

/* ---- 门户配置 ---- */
var PORTAL_GAMES = [
  { id: 'wordle', name: '猜歌名', desc: 'Wordle 猜词', icon: '🔤', color: '#425AEF', page: 'game-wordle' },
  { id: 'choice', name: '二选一', desc: '歌曲对决', icon: '⚖️', color: '#FF7C7C', page: 'game-choice' },
  { id: 'emoji', name: 'Emoji猜歌', desc: '看图猜名', icon: '🎯', color: '#fbbf24', page: 'game-emoji' },
  { id: 'ten', name: '十秒猜歌', desc: '限时挑战', icon: '⏱️', color: '#f04a63', page: 'game-ten' },
  { id: 'land', name: '歌词选择', desc: '选下一句', icon: '📜', color: '#7a60d2', page: 'game-land' },
  { id: 'synthesis', name: '合成大月天', desc: '水果合成', icon: '🍉', color: '#57bd6a', page: 'game-synthesis' },
  { id: 'memory', name: '记忆配对', desc: '翻牌配对', icon: '🃏', color: '#2d1b69', page: 'game-memory' }
];
var PORTAL_TOOLS = [
  { id: 'moments', name: '朋友圈', desc: '主题动态', icon: '📸', color: '#425AEF', page: 'tool-moments' },
  { id: 'scratch', name: 'DIY刮刮乐', desc: '自定义刮奖', icon: '🎟️', color: '#fbbf24', page: 'tool-scratch' },
  { id: 'gallery', name: '图库', desc: '主题图片', icon: '🖼️', color: '#57bd6a', page: 'tool-gallery' }
];

/* ---- 页面显示钩子 ---- */
function portalOnShow(p) {
  if (p === 'mobile-portal') renderPortal();
  else if (p === 'game-wordle') wordleInit();
  else if (p === 'game-choice') choiceInit();
  else if (p === 'game-emoji') emojiInit();
  else if (p === 'game-ten') tenReset();
  else if (p === 'game-land') landInit();
  else if (p === 'game-synthesis') synInit();
  else if (p === 'game-memory') memInit();
  else if (p === 'tool-moments') momentsInit();
  else if (p === 'tool-scratch') scratchInit();
  else if (p === 'tool-gallery') galleryInit();
}

/* ---- 门户首页 ---- */
function renderPortal() {
  var user = ls.get('portal_user', null);
  var nickEl = document.getElementById('portalNickname');
  if (nickEl) nickEl.textContent = user && user.nickname ? user.nickname : '点击设置昵称';
  if (nickEl) nickEl.onclick = openNickModal;

  /* 战绩概览 */
  var stats = [
    { num: ls.get('wordle_stats', { wins: 0 }).wins, label: '猜歌名' },
    { num: ls.get('choice_stats', { bestStreak: 0 }).bestStreak, label: '二选一连击' },
    { num: ls.get('emoji_stats', { solved: 0 }).solved, label: 'Emoji通关' },
    { num: ls.get('ten_stats', { bestScore: 0 }).bestScore, label: '十秒最高分' }
  ];
  var sb = document.getElementById('portalStatsBar');
  if (sb) sb.innerHTML = stats.map(function (s) {
    return '<div class="psb-item"><div class="psb-num">' + s.num + '</div><div class="psb-label">' + s.label + '</div></div>';
  }).join('');

  var hot = document.getElementById('portalHotGames');
  if (hot) hot.innerHTML = PORTAL_GAMES.slice(0, 6).map(portalGameCard).join('');
  var more = document.getElementById('portalMoreGames');
  if (more) more.innerHTML = PORTAL_GAMES.slice(6).map(portalGameCard).join('');
  var tools = document.getElementById('portalTools');
  if (tools) tools.innerHTML = PORTAL_TOOLS.map(portalToolCard).join('');
}
function portalGameCard(g) {
  return '<div class="game-card" onclick="navigate(\'' + g.page + '\')">' +
    '<div class="gc-icon" style="background:' + g.color + '">' + g.icon + '</div>' +
    '<div class="gc-name">' + g.name + '</div><div class="gc-desc">' + g.desc + '</div></div>';
}
function portalToolCard(t) {
  return '<div class="tool-card" onclick="navigate(\'' + t.page + '\')">' +
    '<div class="tc-icon" style="background:' + t.color + '">' + t.icon + '</div>' +
    '<div><div class="tc-name">' + t.name + '</div><div class="tc-desc">' + t.desc + '</div></div></div>';
}

/* ---- 昵称设置 ---- */
function openNickModal() {
  var mask = document.getElementById('passcodeModal');
  var box = document.getElementById('passcodeModalContent');
  if (!mask || !box) return;
  var user = ls.get('portal_user', { nickname: '', avatarColor: '#425AEF' });
  box.innerHTML = '<div class="nick-modal"><div style="font-size:18px;font-weight:800">设置昵称</div>' +
    '<input id="nickInput" value="' + (user.nickname || '') + '" placeholder="输入你的昵称…">' +
    '<button onclick="saveNick()">确定</button></div>';
  mask.classList.add('show');
  mask.style.display = 'flex';
}
function saveNick() {
  var inp = document.getElementById('nickInput');
  if (!inp) return;
  var name = inp.value.trim();
  if (!name) { toast('请输入昵称'); return; }
  var user = ls.get('portal_user', { avatarColor: '#425AEF' });
  user.nickname = name;
  ls.set('portal_user', user);
  document.getElementById('passcodeModal').classList.remove('show');
  document.getElementById('passcodeModal').style.display = 'none';
  renderPortal();
  if (state.tab === 'mine') renderMine();
  toast('昵称已保存：' + name);
}

/* ============================================================
 * 游戏 1：猜歌名 Wordle
 * ============================================================ */
var WORDLE_SONGS = ['温柔', '倔强', '拥抱', '任意门', '步步', '知足', '恋爱ing', '突然好想你', '志明与春娇', '离开地球表面'];
var wordleState = { answer: '', len: 0, row: 0, col: 0, grid: [], over: false };

function wordleInit() {
  var pick = WORDLE_SONGS[Math.floor(Math.random() * WORDLE_SONGS.length)];
  wordleState = { answer: pick, len: pick.length, row: 0, col: 0, grid: [], over: false };
  var g = document.getElementById('wordleGrid');
  if (g) g.innerHTML = '';
  for (var r = 0; r < 5; r++) {
    var row = document.createElement('div');
    row.className = 'wordle-row';
    var cells = [];
    for (var c = 0; c < wordleState.len; c++) {
      var cell = document.createElement('div');
      cell.className = 'wordle-cell';
      row.appendChild(cell);
      cells.push(cell);
    }
    if (g) g.appendChild(row);
    wordleState.grid.push(cells);
  }
  wordleRenderKb();
  var st = document.getElementById('wordleStatus');
  if (st) st.textContent = '猜一首 ' + wordleState.len + ' 字歌名（共 5 次机会）';
}
function wordleRenderKb() {
  var kb = document.getElementById('wordleKb');
  if (!kb) return;
  /* 构建候选字池：答案字符 + 其他歌名中的干扰字 */
  var pool = {};
  var ans = wordleState.answer;
  for (var i = 0; i < ans.length; i++) pool[ans.charAt(i)] = true;
  WORDLE_SONGS.forEach(function (s) { for (var j = 0; j < s.length; j++) pool[s.charAt(j)] = true; });
  var chars = Object.keys(pool);
  /* 洗牌 */
  for (var k = chars.length - 1; k > 0; k--) { var r = Math.floor(Math.random() * (k + 1)); var t = chars[k]; chars[k] = chars[r]; chars[r] = t; }
  wordleState.pool = chars;
  kb.innerHTML = '<div class="wordle-pool">' + chars.map(function (c) {
    return '<div class="wordle-key" onclick="wordleKey(\'' + c + '\')">' + c + '</div>';
  }).join('') + '</div><div class="wordle-kb-row"><div class="wordle-key wide" onclick="wordleKey(\'⌫\')">⌫ 删除</div><div class="wordle-key wide primary" onclick="wordleKey(\'⏎\')">提交</div></div>';
}
function wordleKey(k) {
  if (wordleState.over) return;
  if (k === '⌫') {
    if (wordleState.col > 0) { wordleState.col--; wordleState.grid[wordleState.row][wordleState.col].textContent = ''; }
    return;
  }
  if (k === '⏎') { wordleSubmit(); return; }
  if (wordleState.col < wordleState.len) {
    wordleState.grid[wordleState.row][wordleState.col].textContent = k;
    wordleState.col++;
  }
}
function wordleSubmit() {
  if (wordleState.col < wordleState.len) { toast('请填满整行'); return; }
  var guess = '';
  for (var i = 0; i < wordleState.len; i++) guess += wordleState.grid[wordleState.row][i].textContent;
  var ans = wordleState.answer;
  var result = [];
  var used = [];
  for (var i2 = 0; i2 < ans.length; i2++) used.push(false);
  /* 先标绿 */
  for (var i3 = 0; i3 < ans.length; i3++) {
    if (guess[i3] === ans[i3]) { result[i3] = 'green'; used[i3] = true; }
  }
  /* 再标黄/灰 */
  for (var i4 = 0; i4 < ans.length; i4++) {
    if (result[i4]) continue;
    var found = false;
    for (var j = 0; j < ans.length; j++) {
      if (!used[j] && guess[i4] === ans[j]) { found = true; used[j] = true; break; }
    }
    result[i4] = found ? 'yellow' : 'gray';
  }
  /* 翻转动画 */
  for (var i5 = 0; i5 < ans.length; i5++) {
    (function (idx, cls) {
      setTimeout(function () {
        var cell = wordleState.grid[wordleState.row][idx];
        if (cell) { cell.classList.add('flip'); setTimeout(function () { cell.classList.add(cls); }, 250); }
      }, idx * 200);
    })(i5, result[i5]);
  }
  var win = result.every(function (r) { return r === 'green'; });
  setTimeout(function () {
    if (win) {
      wordleState.over = true;
      var st = ls.get('wordle_stats', { played: 0, wins: 0, streak: 0, maxStreak: 0 });
      st.played++; st.wins++; st.streak++; st.maxStreak = Math.max(st.maxStreak, st.streak);
      ls.set('wordle_stats', st);
      var s = document.getElementById('wordleStatus');
      if (s) s.innerHTML = '🎉 猜对了！答案是《' + ans + '》<br><button class="action-btn primary" style="display:inline-flex;margin-top:10px;padding:10px 24px" onclick="wordleInit()">再来一局</button>';
    } else if (wordleState.row >= 4) {
      wordleState.over = true;
      var st2 = ls.get('wordle_stats', { played: 0, wins: 0, streak: 0, maxStreak: 0 });
      st2.played++; st2.streak = 0;
      ls.set('wordle_stats', st2);
      var s2 = document.getElementById('wordleStatus');
      if (s2) s2.innerHTML = '😢 答案是《' + ans + '》<br><button class="action-btn primary" style="display:inline-flex;margin-top:10px;padding:10px 24px" onclick="wordleInit()">再来一局</button>';
    } else {
      wordleState.row++; wordleState.col = 0;
    }
  }, ans.length * 200 + 300);
}

/* ============================================================
 * 游戏 2：二选一 Choice
 * ============================================================ */
var CHOICE_SONGS = ['温柔', '倔强', '拥抱', '任意门', '步步', '知足', '恋爱ing', '突然好想你', '志明与春娇', '离开地球表面', '伤心的人别听慢歌', '将军令', '如烟', '玫瑰少年', '勇敢', '人生海海', '盛夏光年', '派对动物', '成名在望', '如果我们不曾相遇', '因为你所以我', '后青春期的诗', '生存以上生活以下', '你不是真正的快乐', '小太阳', '垃圾车', '轧车', '爱情万岁', '凡人歌', 'DNA'];
var choiceState = { streak: 0, pair: [] };
function choiceInit() {
  choiceState.streak = 0;
  choiceNext();
}
function choiceNext() {
  var a = CHOICE_SONGS[Math.floor(Math.random() * CHOICE_SONGS.length)];
  var b = CHOICE_SONGS[Math.floor(Math.random() * CHOICE_SONGS.length)];
  while (b === a) b = CHOICE_SONGS[Math.floor(Math.random() * CHOICE_SONGS.length)];
  choiceState.pair = [a, b];
  var el = document.getElementById('choiceCards');
  if (!el) return;
  el.innerHTML = choiceState.pair.map(function (s, i) {
    return '<div class="choice-card" onclick="choicePick(' + i + ')"><div class="cc-emoji">🎵</div><div class="cc-name">' + s + '</div><div class="cc-meta">点击选择</div></div>';
  }).join('');
  var st = document.getElementById('choiceStreak');
  if (st) st.textContent = '连击 ' + choiceState.streak;
}
function choicePick(i) {
  choiceState.streak++;
  var st = ls.get('choice_stats', { votes: 0, bestStreak: 0 });
  st.votes++; st.bestStreak = Math.max(st.bestStreak, choiceState.streak);
  ls.set('choice_stats', st);
  /* 本地排行榜：累计每首歌的票数 */
  var rankings = ls.get('choice_rankings', {});
  var picked = choiceState.pair[i];
  var other = choiceState.pair[1 - i];
  rankings[picked] = (rankings[picked] || 0) + 1;
  if (!rankings[other]) rankings[other] = 0;
  ls.set('choice_rankings', rankings);
  var cards = document.querySelectorAll('#choiceCards .choice-card');
  if (cards[i]) cards[i].classList.add('picked');
  setTimeout(choiceNext, 400);
}
function choiceToggleRank() {
  var el = document.getElementById('choiceRank');
  if (!el) return;
  if (el.style.display === 'none') { choiceRenderRank(); el.style.display = 'block'; }
  else { el.style.display = 'none'; }
}
function choiceRenderRank() {
  var el = document.getElementById('choiceRank');
  if (!el) return;
  var rankings = ls.get('choice_rankings', {});
  var arr = Object.keys(rankings).map(function (k) { return { song: k, votes: rankings[k] }; });
  arr.sort(function (a, b) { return b.votes - a.votes; });
  if (!arr.length) { el.innerHTML = '<div style="text-align:center;padding:20px;color:#999;font-size:13px">还没有投票数据，快去二选一吧～</div>'; return; }
  var max = arr[0].votes || 1;
  el.innerHTML = '<div class="choice-rank-list">' + arr.slice(0, 15).map(function (r, i) {
    var pct = Math.round(r.votes / max * 100);
    var medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ('#' + (i + 1));
    return '<div class="cr-item"><div class="cr-rank">' + medal + '</div><div class="cr-info"><div class="cr-name">' + r.song + '</div><div class="cr-bar"><div class="cr-fill" style="width:' + pct + '%"></div></div></div><div class="cr-votes">' + r.votes + '票</div></div>';
  }).join('') + '</div>';
}

/* ============================================================
 * 游戏 3：Emoji 猜歌
 * ============================================================ */
var EMOJI_QUIZ = [
  { emoji: '🚪🚪🚪🚪🚪🚪🚪', answer: '任意门' },
  { emoji: '🤗💙', answer: '拥抱' },
  { emoji: '😤✊🔥', answer: '倔强' },
  { emoji: '👣👣👣', answer: '步步' },
  { emoji: '😌❤️', answer: '知足' },
  { emoji: '❤️🎵ing', answer: '恋爱ing' },
  { emoji: '😮💭😢', answer: '突然好想你' },
  { emoji: '👨‍🦰👩‍🦰', answer: '志明与春娇' },
  { emoji: '🚀🌍⬆️', answer: '离开地球表面' },
  { emoji: '💔🎵🙅', answer: '伤心的人别听慢歌' },
  { emoji: '🎖️📜', answer: '将军令' },
  { emoji: '🥀👦', answer: '玫瑰少年' },
  { emoji: '💪😤', answer: '勇敢' },
  { emoji: '🌊🌊🌊', answer: '人生海海' },
  { emoji: '☀️🌴', answer: '小太阳' },
  { emoji: '🚬💨', answer: '如烟' },
  { emoji: '🎉🐾', answer: '派对动物' },
  { emoji: '🏆👀', answer: '成名在望' },
  { emoji: '💙➡️我', answer: '因为你所以我' },
  { emoji: '📖🎓', answer: '后青春期的诗' }
];
var emojiState = { idx: 0, hints: 3 };
function emojiInit() {
  emojiState.idx = Math.floor(Math.random() * EMOJI_QUIZ.length);
  emojiState.hints = 3;
  emojiRender();
}
function emojiRender() {
  var q = EMOJI_QUIZ[emojiState.idx];
  var d = document.getElementById('emojiDisplay');
  if (d) d.textContent = q.emoji;
  var inp = document.getElementById('emojiInput');
  if (inp) inp.value = '';
  var st = document.getElementById('emojiStatus');
  if (st) st.textContent = '提示剩余：' + emojiState.hints;
}
function submitEmojiGuess() {
  var inp = document.getElementById('emojiInput');
  if (!inp) return;
  var val = inp.value.trim();
  if (!val) { toast('请输入歌名'); return; }
  var q = EMOJI_QUIZ[emojiState.idx];
  if (val === q.answer) {
    var st = ls.get('emoji_stats', { solved: 0, hintsUsed: 0 });
    st.solved++;
    ls.set('emoji_stats', st);
    toast('🎉 猜对了！《' + q.answer + '》');
    emojiNext();
  } else {
    var d = document.getElementById('emojiDisplay');
    if (d) { d.classList.add('emoji-shake'); setTimeout(function () { d.classList.remove('emoji-shake'); }, 400); }
    toast('不对哦，再试试');
  }
}
function emojiHint() {
  if (emojiState.hints <= 0) { toast('提示已用完'); return; }
  emojiState.hints--;
  var q = EMOJI_QUIZ[emojiState.idx];
  var st = ls.get('emoji_stats', { solved: 0, hintsUsed: 0 });
  st.hintsUsed++;
  ls.set('emoji_stats', st);
  toast('提示：第 1 个字是「' + q.answer.charAt(0) + '」');
  var s = document.getElementById('emojiStatus');
  if (s) s.textContent = '提示剩余：' + emojiState.hints;
}
function emojiNext() {
  emojiState.idx = (emojiState.idx + 1) % EMOJI_QUIZ.length;
  emojiRender();
}

/* ============================================================
 * 游戏 4：十秒猜歌
 * ============================================================ */
var TEN_QUIZ = [
  { lyric: '走在风中 今天阳光 突然好温柔', answer: '温柔' },
  { lyric: '我和我最后的倔强 握紧双手绝对不放', answer: '倔强' },
  { lyric: '给我抱抱 把爱传出去', answer: '拥抱' },
  { lyric: '任意门外我们都任意的飞', answer: '任意门' },
  { lyric: '步步 都是一步一步走过来的', answer: '步步' },
  { lyric: '怎么去拥有 一道彩虹', answer: '知足' },
  { lyric: '恋爱ing happy ing', answer: '恋爱ing' },
  { lyric: '最怕空气突然安静', answer: '突然好想你' },
  { lyric: '既然青春留不住 还是做个大叔好', answer: '志明与春娇' },
  { lyric: '丢掉手表丢外套 丢掉背包再丢唠叨', answer: '离开地球表面' },
  { lyric: '伤心的人别听慢歌', answer: '伤心的人别听慢歌' },
  { lyric: '将军令', answer: '将军令' },
  { lyric: '你问我长大要做什么', answer: '勇敢' },
  { lyric: '今天又是人生海海', answer: '人生海海' },
  { lyric: '你是巨大的海洋 我是海上小船', answer: '小太阳' },
  { lyric: '我坐在床前 望着窗外回忆满天', answer: '如烟' },
  { lyric: '甩甩头 甩甩头 跟我一起摇头', answer: '派对动物' },
  { lyric: '那黑的彩的红的黄的蓝的', answer: '成名在望' },
  { lyric: '因为你 所以我 爱上那片天空', answer: '因为你所以我' },
  { lyric: '我们都要把自己照顾好', answer: '后青春期的诗' }
];
var tenState = { idx: 0, timer: null, left: 14, score: 0, playing: false };
function tenReset() {
  if (tenState.timer) { clearInterval(tenState.timer); tenState.timer = null; }
  tenState = { idx: 0, timer: null, left: 14, score: 0, playing: false };
  var b = document.getElementById('tenBalls');
  if (b) b.innerHTML = '';
  for (var i = 0; i < 14; i++) { var s = document.createElement('span'); s.className = 'ten-ball'; if (b) b.appendChild(s); }
  var l = document.getElementById('tenLyric');
  if (l) { l.textContent = '点击开始'; l.classList.remove('urgent'); }
  var sc = document.getElementById('tenScore');
  if (sc) sc.textContent = '0';
  var inp = document.getElementById('tenInput');
  if (inp) inp.disabled = true;
  var btn = document.getElementById('tenBtn');
  if (btn) btn.textContent = '开始';
  var st = document.getElementById('tenStatus');
  if (st) st.textContent = '每题 14 秒，剩余秒数 × 10 = 得分';
}
function tenStart() {
  if (tenState.playing) { tenSubmit(); return; }
  tenState.playing = true;
  tenState.left = 14;
  tenState.idx = Math.floor(Math.random() * TEN_QUIZ.length);
  var q = TEN_QUIZ[tenState.idx];
  var l = document.getElementById('tenLyric');
  if (l) { l.textContent = q.lyric; l.classList.remove('urgent'); }
  var inp = document.getElementById('tenInput');
  if (inp) { inp.disabled = false; inp.value = ''; inp.focus(); }
  var btn = document.getElementById('tenBtn');
  if (btn) btn.textContent = '提交';
  tenRenderBalls();
  tenState.timer = setInterval(function () {
    tenState.left--;
    tenRenderBalls();
    if (tenState.left <= 3) { var ll = document.getElementById('tenLyric'); if (ll) ll.classList.add('urgent'); }
    if (tenState.left <= 0) { tenEnd(false); }
  }, 1000);
}
function tenRenderBalls() {
  var balls = document.querySelectorAll('#tenBalls .ten-ball');
  for (var i = 0; i < balls.length; i++) {
    if (i < 14 - tenState.left) balls[i].classList.add('gone'); else balls[i].classList.remove('gone');
  }
}
function tenSubmit() {
  if (!tenState.playing) return;
  var inp = document.getElementById('tenInput');
  if (!inp) return;
  var val = inp.value.trim();
  var q = TEN_QUIZ[tenState.idx];
  if (val === q.answer) { tenEnd(true); } else { toast('不对哦'); }
}
function tenEnd(win) {
  if (tenState.timer) { clearInterval(tenState.timer); tenState.timer = null; }
  tenState.playing = false;
  var q = TEN_QUIZ[tenState.idx];
  if (win) {
    var gain = tenState.left * 10;
    tenState.score += gain;
    var sc = document.getElementById('tenScore');
    if (sc) sc.textContent = tenState.score;
    toast('🎉 +' + gain + ' 分！');
  }
  var st = ls.get('ten_stats', { played: 0, totalScore: 0, bestScore: 0 });
  st.played++; st.totalScore += tenState.score;
  st.bestScore = Math.max(st.bestScore, tenState.score);
  ls.set('ten_stats', st);
  var l = document.getElementById('tenLyric');
  if (l) { l.textContent = '答案是《' + q.answer + '》'; l.classList.remove('urgent'); }
  var inp = document.getElementById('tenInput');
  if (inp) inp.disabled = true;
  var btn = document.getElementById('tenBtn');
  if (btn) btn.textContent = '开始';
  var stEl = document.getElementById('tenStatus');
  if (stEl) stEl.innerHTML = '本轮得分：' + tenState.score + ' · 最高：' + st.bestScore + '<br>点击「开始」再来一题';
}

/* ============================================================
 * 游戏 5：歌词选择 Land
 * ============================================================ */
var LAND_QUIZ = [
  { lyric: '走在风中 今天阳光', options: ['突然好温柔', '突然好想你', '突然下雨', '突然好冷'], answer: 0, song: '温柔' },
  { lyric: '我和我最后的倔强', options: ['握紧双手绝对不放', '松开双手让你走', '抬起头向前走', '闭上眼不回头'], answer: 0, song: '倔强' },
  { lyric: '给我抱抱', options: ['把爱传出去', '把心交出来', '把手举起来', '把泪擦干净'], answer: 0, song: '拥抱' },
  { lyric: '怎么去拥有', options: ['一道彩虹', '一片天空', '一阵清风', '一束阳光'], answer: 0, song: '知足' },
  { lyric: '最怕空气', options: ['突然安静', '突然变冷', '突然稀薄', '突然凝固'], answer: 0, song: '突然好想你' },
  { lyric: '丢掉手表丢外套', options: ['丢掉背包再丢唠叨', '丢掉烦恼再丢忧伤', '丢掉手机再丢信号', '丢掉回忆再丢过往'], answer: 0, song: '离开地球表面' },
  { lyric: '任意门外我们', options: ['都任意的飞', '都任意地走', '都任意地笑', '都任意地唱'], answer: 0, song: '任意门' },
  { lyric: '步步', options: ['都是一步一步走过来的', '都是一步一步走过去的', '都是一步一步走下去的', '都是一步一步走回来的'], answer: 0, song: '步步' },
  { lyric: '今天又是', options: ['人生海海', '人生漫漫', '人生如梦', '人生如戏'], answer: 0, song: '人生海海' },
  { lyric: '你问我', options: ['长大要做什么', '未来在哪里', '快乐是什么', '梦想是什么'], answer: 0, song: '勇敢' },
  { lyric: '我坐在床前', options: ['望着窗外回忆满天', '看着天花板发呆', '数着星星到天亮', '听着雨声到天明'], answer: 0, song: '如烟' },
  { lyric: '因为你', options: ['所以我爱上那片天空', '所以我不再孤单', '所以我勇敢前行', '所以我愿意等待'], answer: 0, song: '因为你所以我' },
  { lyric: '我们都要', options: ['把自己照顾好', '把彼此记心里', '把过去放下', '把未来拥抱'], answer: 0, song: '后青春期的诗' },
  { lyric: '甩甩头', options: ['跟我一起摇头', '跟我一起跳舞', '跟我一起唱歌', '跟我一起疯狂'], answer: 0, song: '派对动物' },
  { lyric: '那黑的彩的红的', options: ['黄的蓝的', '白的灰的', '紫的粉的', '金的银的'], answer: 0, song: '成名在望' },
  { lyric: '伤心的人', options: ['别听慢歌', '别回头看', '别再流泪', '别再执着'], answer: 0, song: '伤心的人别听慢歌' },
  { lyric: '你是巨大的海洋', options: ['我是海上小船', '我是岸边的树', '我是天空的云', '我是海底的鱼'], answer: 0, song: '小太阳' },
  { lyric: '既然青春留不住', options: ['还是做个大叔好', '不如好好珍惜', '那就勇敢前行', '就让它随风去'], answer: 0, song: '志明与春娇' },
  { lyric: '恋爱ing', options: ['happy ing', 'loving ing', 'smiling ing', 'dreaming ing'], answer: 0, song: '恋爱ing' },
  { lyric: '将军令', options: ['将军令下', '将军出征', '将军一怒', '将军百战'], answer: 0, song: '将军令' }
];
var landState = { idx: 0, score: 0, total: 0 };
function landInit() {
  landState = { idx: 0, score: 0, total: 0 };
  landRender();
}
function landRender() {
  var body = document.getElementById('landBody');
  if (!body) return;
  if (landState.idx >= LAND_QUIZ.length) {
    body.innerHTML = '<div style="text-align:center;padding:30px"><div style="font-size:24px;font-weight:900;color:#7a60d2">完成！</div><div style="margin:14px;font-size:16px">得分：' + landState.score + ' / ' + landState.total + '</div><button class="action-btn primary" style="display:inline-flex;padding:12px 28px" onclick="landInit()">再来一次</button></div>';
    return;
  }
  var q = LAND_QUIZ[landState.idx];
  /* 打乱选项 */
  var opts = q.options.slice();
  var correctText = opts[q.answer];
  for (var i = opts.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = opts[i]; opts[i] = opts[j]; opts[j] = t; }
  var correctIdx = opts.indexOf(correctText);
  body.innerHTML = '<div class="land-card"><div class="lc-lyric">「' + q.lyric + '…」</div><div class="lc-credit">— ' + q.song + ' · 第 ' + (landState.idx + 1) + '/' + LAND_QUIZ.length + ' 题</div></div>' +
    '<div class="land-options">' + opts.map(function (o, i) {
      return '<div class="land-opt" onclick="landPick(' + i + ',' + correctIdx + ')">' + o + '</div>';
    }).join('') + '</div><div style="text-align:center;margin:14px;font-size:13px;color:#999">得分：' + landState.score + '</div>';
}
function landPick(i, correctIdx) {
  landState.total++;
  var opts = document.querySelectorAll('#landBody .land-opt');
  if (i === correctIdx) { landState.score++; if (opts[i]) opts[i].classList.add('correct'); }
  else { if (opts[i]) opts[i].classList.add('wrong'); if (opts[correctIdx]) opts[correctIdx].classList.add('correct'); }
  setTimeout(function () {
    landState.idx++;
    if (landState.idx >= LAND_QUIZ.length) {
      var st = ls.get('land_stats', { played: 0, bestScore: 0, total: LAND_QUIZ.length });
      st.played++; st.bestScore = Math.max(st.bestScore, landState.score);
      ls.set('land_stats', st);
    }
    landRender();
  }, 800);
}

/* ============================================================
 * 游戏 6：合成大月天 Synthesis（原生 Canvas 简化物理）
 * ============================================================ */
var synState = { balls: [], score: 0, next: 1, over: false, raf: null, canvas: null, ctx: null, W: 320, H: 420, dropping: null };
var SYN_RADII = [16, 22, 28, 34, 42, 50, 60, 72, 86, 100];
var SYN_IMAGES = [];
var synImagesLoaded = 0;
function synPreloadImages(cb) {
  synImagesLoaded = 0;
  SYN_IMAGES = [];
  for (var i = 0; i < 10; i++) {
    var img = new Image();
    img.onload = function () { synImagesLoaded++; if (synImagesLoaded >= 10 && cb) cb(); };
    img.onerror = function () { synImagesLoaded++; if (synImagesLoaded >= 10 && cb) cb(); };
    img.src = SYN_EMOJI[i];
    SYN_IMAGES.push(img);
  }
}
function synInit() {
  var c = document.getElementById('synCanvas');
  if (!c) return;
  synState.canvas = c;
  synState.ctx = c.getContext('2d');
  synState.balls = []; synState.score = 0; synState.over = false; synState.next = 1; synState.dropping = null;
  if (synState.raf) cancelAnimationFrame(synState.raf);
  synPreloadImages(function () { synLoop(); });
  synRenderScore();
  /* 事件 */
  c.onmousedown = synDrop;
  c.ontouchstart = function (e) { e.preventDefault(); synDrop(e); };
}
function synDrop(e) {
  if (synState.over || synState.dropping) return;
  var rect = synState.canvas.getBoundingClientRect();
  var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  x = Math.max(SYN_RADII[0], Math.min(synState.W - SYN_RADII[0], x));
  synState.dropping = { x: x, y: 20, vx: 0, vy: 0, level: synState.next, r: SYN_RADII[synState.next] };
  synState.next = Math.floor(Math.random() * 4);
  synRenderNext();
}
function synRenderScore() {
  var s = document.getElementById('synScore');
  if (s) s.textContent = synState.score;
}
function synRenderNext() {
  var n = document.getElementById('synNext');
  if (n) n.innerHTML = '<img src="' + SYN_EMOJI[synState.next] + '" alt="">';
}
function synLoop() {
  if (!synState.ctx) return;
  var ctx = synState.ctx;
  ctx.clearRect(0, 0, synState.W, synState.H);
  /* 顶部线 */
  ctx.strokeStyle = 'rgba(240,74,99,.4)';
  ctx.setLineDash([6, 4]);
  ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(synState.W, 50); ctx.stroke();
  ctx.setLineDash([]);
  /* 下落球 */
  if (synState.dropping) {
    synState.dropping.vy += 0.5;
    synState.dropping.y += synState.dropping.vy;
    synState.dropping.x += synState.dropping.vx;
    if (synState.dropping.x < synState.dropping.r) { synState.dropping.x = synState.dropping.r; synState.dropping.vx *= -0.5; }
    if (synState.dropping.x > synState.W - synState.dropping.r) { synState.dropping.x = synState.W - synState.dropping.r; synState.dropping.vx *= -0.5; }
    /* 碰撞检测 */
    var landed = false;
    for (var i = 0; i < synState.balls.length; i++) {
      var b = synState.balls[i];
      var dx = synState.dropping.x - b.x, dy = synState.dropping.y - b.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < synState.dropping.r + b.r) { landed = true; break; }
    }
    if (synState.dropping.y + synState.dropping.r >= synState.H) landed = true;
    if (landed) {
      var nb = synState.dropping;
      synState.balls.push(nb);
      synState.dropping = null;
      synCheckMerge();
      synCheckOver();
    }
  }
  /* 物理：球之间简单分离 */
  for (var i2 = 0; i2 < synState.balls.length; i2++) {
    var b1 = synState.balls[i2];
    b1.vy = (b1.vy || 0) + 0.3;
    b1.y += b1.vy;
    b1.x += b1.vx || 0;
    if (b1.x < b1.r) { b1.x = b1.r; b1.vx = 0; }
    if (b1.x > synState.W - b1.r) { b1.x = synState.W - b1.r; b1.vx = 0; }
    if (b1.y + b1.r >= synState.H) { b1.y = synState.H - b1.r; b1.vy = 0; b1.vx *= 0.8; }
    for (var j = i2 + 1; j < synState.balls.length; j++) {
      var b2 = synState.balls[j];
      var dx2 = b2.x - b1.x, dy2 = b2.y - b1.y;
      var d = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      var minD = b1.r + b2.r;
      if (d < minD && d > 0) {
        var overlap = (minD - d) / 2;
        var nx = dx2 / d, ny = dy2 / d;
        b1.x -= nx * overlap; b1.y -= ny * overlap;
        b2.x += nx * overlap; b2.y += ny * overlap;
        b1.vx = (b1.vx || 0) * 0.7; b1.vy = (b1.vy || 0) * 0.7;
        b2.vx = (b2.vx || 0) * 0.7; b2.vy = (b2.vy || 0) * 0.7;
      }
    }
  }
  /* 绘制球 */
  for (var k = 0; k < synState.balls.length; k++) {
    var b3 = synState.balls[k];
    if (SYN_IMAGES[b3.level] && SYN_IMAGES[b3.level].complete) {
      ctx.save();
      ctx.beginPath(); ctx.arc(b3.x, b3.y, b3.r, 0, 2 * Math.PI); ctx.clip();
      ctx.drawImage(SYN_IMAGES[b3.level], b3.x - b3.r, b3.y - b3.r, b3.r * 2, b3.r * 2);
      ctx.restore();
    } else {
      ctx.beginPath(); ctx.arc(b3.x, b3.y, b3.r, 0, 2 * Math.PI);
      ctx.fillStyle = ['#57bd6a', '#425AEF', '#fbbf24', '#FF7C7C', '#7a60d2', '#f04a63', '#22c55e', '#06b6d4', '#a78bfa', '#e38100'][b3.level] || '#57bd6a';
      ctx.fill();
    }
  }
  /* 绘制下落球 */
  if (synState.dropping) {
    var db = synState.dropping;
    if (SYN_IMAGES[db.level] && SYN_IMAGES[db.level].complete) {
      ctx.save();
      ctx.beginPath(); ctx.arc(db.x, db.y, db.r, 0, 2 * Math.PI); ctx.clip();
      ctx.drawImage(SYN_IMAGES[db.level], db.x - db.r, db.y - db.r, db.r * 2, db.r * 2);
      ctx.restore();
    } else {
      ctx.beginPath(); ctx.arc(db.x, db.y, db.r, 0, 2 * Math.PI); ctx.fillStyle = '#57bd6a'; ctx.fill();
    }
  }
  synState.raf = requestAnimationFrame(synLoop);
}
function synCheckMerge() {
  var merged = true;
  while (merged) {
    merged = false;
    for (var i = 0; i < synState.balls.length; i++) {
      for (var j = i + 1; j < synState.balls.length; j++) {
        var a = synState.balls[i], b = synState.balls[j];
        if (a.level === b.level && a.level < 9) {
          var dx = a.x - b.x, dy = a.y - b.y;
          if (Math.sqrt(dx * dx + dy * dy) < a.r + b.r) {
            a.level++; a.r = SYN_RADII[a.level]; a.x = (a.x + b.x) / 2; a.y = (a.y + b.y) / 2; a.vy = -2;
            synState.balls.splice(j, 1);
            synState.score += (a.level + 1) * 10;
            synRenderScore();
            merged = true;
            break;
          }
        }
      }
      if (merged) break;
    }
  }
}
function synCheckOver() {
  for (var i = 0; i < synState.balls.length; i++) {
    if (synState.balls[i].y - synState.balls[i].r < 50 && Math.abs(synState.balls[i].vy || 0) < 0.5) {
      synState.over = true;
      var st = ls.get('synthesis_stats', { bestScore: 0, games: 0 });
      st.games++; st.bestScore = Math.max(st.bestScore, synState.score);
      ls.set('synthesis_stats', st);
      var s = document.getElementById('synStatus');
      if (s) s.innerHTML = '游戏结束！得分：' + synState.score + ' · 最高：' + st.bestScore + '<br><button class="action-btn primary" style="display:inline-flex;margin-top:10px;padding:10px 24px" onclick="synInit()">重新开始</button>';
      break;
    }
  }
}

/* ============================================================
 * 游戏 7：记忆配对 Memory
 * ============================================================ */
var memState = { level: 1, cards: [], flipped: [], matched: 0, total: 8, timer: null, time: 0, lock: false };
var MEM_LEVELS = [{ cols: 4, rows: 4, pairs: 8 }, { cols: 5, rows: 4, pairs: 10 }, { cols: 6, rows: 6, pairs: 18 }];
function memInit() {
  if (memState.timer) { clearInterval(memState.timer); memState.timer = null; }
  var cfg = MEM_LEVELS[memState.level - 1] || MEM_LEVELS[0];
  memState.total = cfg.pairs * 2;
  memState.matched = 0;
  memState.flipped = [];
  memState.time = 0;
  memState.lock = false;
  var imgs = [];
  for (var i = 0; i < cfg.pairs; i++) { imgs.push(TEN_EMOJI[i % 10], TEN_EMOJI[i % 10]); }
  /* 洗牌 */
  for (var j = imgs.length - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)); var t = imgs[j]; imgs[j] = imgs[k]; imgs[k] = t; }
  memState.cards = imgs.map(function (src) { return { src: src, flipped: false, matched: false }; });
  var grid = document.getElementById('memGrid');
  if (grid) {
    grid.style.gridTemplateColumns = 'repeat(' + cfg.cols + ', 64px)';
    grid.innerHTML = memState.cards.map(function (c, i) {
      return '<div class="mem-card" onclick="memFlip(' + i + ')"><div class="mem-card-inner"><div class="mem-face mem-front">🎵</div><div class="mem-face mem-back"><img src="' + c.src + '" alt=""></div></div></div>';
    }).join('');
  }
  memUpdateInfo();
  memState.timer = setInterval(function () { memState.time++; memUpdateInfo(); }, 1000);
}
function memFlip(i) {
  if (memState.lock) return;
  var c = memState.cards[i];
  if (c.flipped || c.matched) return;
  c.flipped = true;
  memState.flipped.push(i);
  var el = document.querySelectorAll('#memGrid .mem-card')[i];
  if (el) el.classList.add('flipped');
  if (memState.flipped.length === 2) {
    memState.lock = true;
    var a = memState.flipped[0], b = memState.flipped[1];
    if (memState.cards[a].src === memState.cards[b].src) {
      memState.cards[a].matched = true; memState.cards[b].matched = true;
      memState.matched += 2;
      var ea = document.querySelectorAll('#memGrid .mem-card')[a];
      var eb = document.querySelectorAll('#memGrid .mem-card')[b];
      if (ea) ea.querySelector('.mem-back').classList.add('matched');
      if (eb) eb.querySelector('.mem-back').classList.add('matched');
      memState.flipped = [];
      memState.lock = false;
      memUpdateInfo();
      if (memState.matched >= memState.total) {
        clearInterval(memState.timer); memState.timer = null;
        var key = 'level' + memState.level + 'Best';
        var st = ls.get('memory_stats', {});
        if (!st[key] || memState.time < st[key]) { st[key] = memState.time; ls.set('memory_stats', st); }
        toast('🎉 通关！用时 ' + memState.time + 's');
      }
    } else {
      setTimeout(function () {
        memState.cards[a].flipped = false; memState.cards[b].flipped = false;
        var ea2 = document.querySelectorAll('#memGrid .mem-card')[a];
        var eb2 = document.querySelectorAll('#memGrid .mem-card')[b];
        if (ea2) ea2.classList.remove('flipped');
        if (eb2) eb2.classList.remove('flipped');
        memState.flipped = [];
        memState.lock = false;
      }, 800);
    }
  }
}
function memUpdateInfo() {
  var l = document.getElementById('memLevel'); if (l) l.textContent = memState.level;
  var t = document.getElementById('memTime'); if (t) t.textContent = memState.time;
  var m = document.getElementById('memMatched'); if (m) m.textContent = memState.matched;
  var tot = document.getElementById('memTotal'); if (tot) tot.textContent = memState.total;
}
function memNextLevel() {
  memState.level = memState.level >= 3 ? 1 : memState.level + 1;
  memInit();
}

/* ============================================================
 * 工具 1：朋友圈 Moments
 * ============================================================ */
var MOMENTS_DATA = [
  { name: '温柔的歌', color: '#FF7C7C', time: '今天 14:32', text: '鸟巢 55 场，毕业快乐 🎓 从无名高地到鸟巢的 10 年，谢谢你们对五月天的疼爱。', imgs: [ASSET + 'albums/' + encodeURIComponent('自传-C9G6ePFH.jpg')] },
  { name: '倔强的番茄', color: '#425AEF', time: '今天 11:20', text: '明园餐厅的炸酱面绝了！玛莎同款，对暗号还能送酸梅汤 🍜', imgs: [ASSET + 'albums/' + encodeURIComponent('第一张创作专辑-DkV_pH8G.jpg')] },
  { name: '任意门守门人', color: '#57bd6a', time: '昨天 19:05', text: '外滩夜景 + 歌词地贴 = 完美出片，建议日落前来，光线最棒 🌇', imgs: [ASSET + 'albums/' + encodeURIComponent('知足 最真杰作选-Dshc6mg-.jpg')] },
  { name: '卜卜爱好者', color: '#fbbf24', time: '昨天 16:00', text: '7.4 米纯真兔太治愈了！限定 Tee 已入手，西单更新场走起 🐰', imgs: [ASSET + 'albums/' + encodeURIComponent('后青春期的诗-EzCXj1Qb.jpg')] },
  { name: '梦想卜览员', color: '#7a60d2', time: '前天 11:30', text: '33 米胡萝卜麦克风震撼！吉尼斯认证实至名归 🥕🎤', imgs: [ASSET + 'albums/' + encodeURIComponent('步步 自选作品辑-DoBobm4t.jpg')] },
  { name: '工业风五迷', color: '#f04a63', time: '3 天前 18:45', text: '首钢园日落 + 石头公仔 = 北京最出片打卡点，没有之一 🏭', imgs: [ASSET + 'albums/' + encodeURIComponent('离开地球表面 Jump!-BhO1XiYG.jpg')] },
  { name: '星空下的我们', color: '#06b6d4', time: '3 天前 20:30', text: '朝阳公园五大球灯光秀太美了，好运桥《星空》光影步道必打卡 ✨', imgs: [ASSET + 'albums/' + encodeURIComponent('因为你 所以我-s_V6WMTD.jpg')] },
  { name: '石头本石', color: '#22c55e', time: '4 天前 09:15', text: '居庸关长城 + 阿信公仔同框，不到长城非好汉的五迷版 🧱', imgs: [ASSET + 'albums/' + encodeURIComponent('玫瑰少年-DbTsPLrn.jpg')] },
  { name: '勇敢的少年', color: '#e38100', time: '5 天前 13:00', text: '人生海海，今天又是新的一天。五月天陪你走过每一个重要时刻 🌊', imgs: [ASSET + 'albums/' + encodeURIComponent('人生海海-BOGDD25n.jpg')] },
  { name: '伤心的人别听慢歌', color: '#a78bfa', time: '5 天前 22:10', text: '伤心的人别听慢歌，但五月天的快歌能治愈一切 🎵', imgs: [ASSET + 'albums/' + encodeURIComponent('伤心的人别听慢歌-C6arM80p.jpg')] }
];
function momentsInit() {
  var el = document.getElementById('momentsList');
  if (!el) return;
  /* 应用保存的主题 */
  var dark = ls.get('moments_dark', false);
  momApplyTheme(dark);
  el.innerHTML = MOMENTS_DATA.map(function (m) {
    return '<div class="moment-card"><div class="mc-head"><div class="mc-avatar" style="background:' + m.color + '">' + m.name.charAt(0) + '</div><div><div class="mc-name">' + m.name + '</div><div class="mc-time">' + m.time + '</div></div></div>' +
      '<div class="mc-text">' + m.text + '</div>' +
      (m.imgs ? '<div class="mc-imgs">' + m.imgs.map(function (s) { return '<img src="' + s + '" loading="lazy" onclick="openLightbox(\'' + s + '\')">'; }).join('') + '</div>' : '') +
      '</div>';
  }).join('');
}
function momToggleTheme() {
  var dark = ls.get('moments_dark', false);
  dark = !dark;
  ls.set('moments_dark', dark);
  momApplyTheme(dark);
}
function momApplyTheme(dark) {
  var page = document.getElementById('page-tool-moments');
  var toggle = document.getElementById('momThemeToggle');
  if (page) page.classList.toggle('mom-dark', dark);
  if (toggle) toggle.textContent = dark ? '☀️' : '🌙';
}

/* ============================================================
 * 工具 2：DIY 刮刮乐 Scratch
 * ============================================================ */
var SCRATCH_TPLS = ['温柔', '倔强', '拥抱', '任意门', '步步', '知足', '恋爱ing'];
var scratchState = { ctx: null, canvas: null, text: '温柔', scratched: 0 };
function scratchInit() {
  var c = document.getElementById('scratchCanvas');
  if (!c) return;
  scratchState.canvas = c;
  scratchState.ctx = c.getContext('2d');
  /* 模板行 */
  var tpls = document.getElementById('scratchTpls');
  if (tpls) tpls.innerHTML = SCRATCH_TPLS.map(function (t, i) {
    return '<div class="stp' + (t === scratchState.text ? ' active' : '') + '" onclick="scratchPick(\'' + t + '\')">' + t + '</div>';
  }).join('');
  var txt = document.getElementById('scratchText');
  if (txt) scratchState.text = txt.value || '温柔';
  scratchReset();
}
function scratchPick(t) {
  scratchState.text = t;
  var inp = document.getElementById('scratchText');
  if (inp) inp.value = t;
  var prize = document.getElementById('scratchPrize');
  if (prize) prize.textContent = t;
  scratchInit();
}
function scratchReset() {
  var ctx = scratchState.ctx;
  if (!ctx) return;
  var prize = document.getElementById('scratchPrize');
  if (prize) prize.textContent = scratchState.text;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#c0c0c4';
  ctx.fillRect(0, 0, 300, 200);
  ctx.fillStyle = '#999';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('刮开看看你的运气 ✨', 150, 105);
  scratchState.scratched = 0;
  var c = scratchState.canvas;
  c.onmousedown = scratchStart;
  c.ontouchstart = function (e) { e.preventDefault(); scratchStart(e); };
}
var _scratchMove = null, _scratchEnd = null;
function scratchStart(e) {
  var ctx = scratchState.ctx;
  if (!ctx) return;
  ctx.globalCompositeOperation = 'destination-out';
  ctx.lineWidth = 30;
  ctx.lineCap = 'round';
  var rect = scratchState.canvas.getBoundingClientRect();
  var scale = 300 / rect.width;
  var p = e.touches ? e.touches[0] : e;
  var x = (p.clientX - rect.left) * scale, y = (p.clientY - rect.top) * scale;
  ctx.beginPath(); ctx.moveTo(x, y);
  _scratchMove = function (ev) {
    var pp = ev.touches ? ev.touches[0] : ev;
    var nx = (pp.clientX - rect.left) * scale, ny = (pp.clientY - rect.top) * scale;
    ctx.lineTo(nx, ny); ctx.stroke();
    scratchState.scratched++;
    if (scratchState.scratched > 80 && !scratchState._done) {
      scratchState._done = true;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, 300, 200);
      toast('🎉 刮中「' + scratchState.text + '」！');
    }
  };
  _scratchEnd = function () {
    document.removeEventListener('mousemove', _scratchMove);
    document.removeEventListener('mouseup', _scratchEnd);
    document.removeEventListener('touchmove', _scratchMove);
    document.removeEventListener('touchend', _scratchEnd);
  };
  document.addEventListener('mousemove', _scratchMove);
  document.addEventListener('mouseup', _scratchEnd);
  document.addEventListener('touchmove', _scratchMove, { passive: false });
  document.addEventListener('touchend', _scratchEnd);
}
function scratchShare() {
  var user = ls.get('portal_user', { nickname: '五迷' });
  var name = user.nickname || '五迷';
  var date = new Date();
  var dateStr = date.getFullYear() + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + String(date.getDate()).padStart(2, '0');
  /* 合成分享图：渐变背景 + 奖品文字 + 昵称 + 日期 + Logo */
  var cv = document.createElement('canvas');
  cv.width = 600; cv.height = 800;
  var ctx = cv.getContext('2d');
  /* 背景渐变 */
  var grad = ctx.createLinearGradient(0, 0, 600, 800);
  grad.addColorStop(0, '#425AEF');
  grad.addColorStop(0.5, '#7a60d2');
  grad.addColorStop(1, '#FF6B9D');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 800);
  /* 装饰圆点 */
  ctx.fillStyle = 'rgba(255,255,255,.15)';
  ctx.beginPath(); ctx.arc(80, 120, 60, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(540, 700, 80, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(500, 100, 30, 0, Math.PI * 2); ctx.fill();
  /* 标题 */
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('MaydayLand 刮刮乐', 300, 100);
  ctx.font = '16px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,.8)';
  ctx.fillText('Mayday 陪你刮到好运', 300, 130);
  /* 奖品卡片 */
  ctx.fillStyle = 'rgba(255,255,255,.95)';
  roundRect(ctx, 80, 220, 440, 280, 24);
  ctx.fill();
  ctx.fillStyle = '#425AEF';
  ctx.font = 'bold 72px sans-serif';
  ctx.fillText(scratchState.text, 300, 380);
  ctx.fillStyle = '#999';
  ctx.font = '18px sans-serif';
  ctx.fillText('刮中好运 🎉', 300, 430);
  ctx.fillStyle = '#FF6B9D';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('✨ ✨ ✨', 300, 470);
  /* 底部信息 */
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(name, 300, 600);
  ctx.font = '14px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,.7)';
  ctx.fillText(dateStr + ' · MaydayLand', 300, 630);
  ctx.font = '12px sans-serif';
  ctx.fillText('长按图片保存或分享', 300, 720);
  /* 渲染预览 */
  var prev = document.getElementById('scratchSharePreview');
  if (!prev) return;
  prev.style.display = 'block';
  prev.innerHTML = '<img src="' + cv.toDataURL('image/png') + '" style="max-width:260px;border-radius:14px;box-shadow:0 4px 16px rgba(0,0,0,.2)"><div style="font-size:12px;color:#999;margin-top:6px">长按图片保存到相册</div>';
  toast('分享图已生成 ✨');
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ============================================================
 * 工具 3：图库 Gallery
 * ============================================================ */
function galleryInit() {
  var el = document.getElementById('galleryGrid');
  if (!el) return;
  var imgs = [];
  /* 用专辑封面作为图库内容 */
  var albums = ['自传-C9G6ePFH.jpg', '第一张创作专辑-DkV_pH8G.jpg', '知足 最真杰作选-Dshc6mg-.jpg', '后青春期的诗-EzCXj1Qb.jpg', '步步 自选作品辑-DoBobm4t.jpg', '离开地球表面 Jump!-BhO1XiYG.jpg', '因为你 所以我-s_V6WMTD.jpg', '时光机-CGbQBaUm.jpg', '玫瑰少年-DbTsPLrn.jpg', '勇敢-BXCpUl6B.jpg', '人生海海-BOGDD25n.jpg', '盛夏光年-DeGlutqh.jpg', '伤心的人别听慢歌-C6arM80p.jpg', '将军令-CxjrlsAV.jpg', '凡人歌-B23FlQae.jpg', 'DNA-cz_Tdu1n.jpg', '为爱而生-B4BFUtgw.jpg', '爱情万岁-C7BlxB8G.jpg'];
  imgs = albums.map(function (a) { return ASSET + 'albums/' + encodeURIComponent(a); });
  el.innerHTML = imgs.map(function (s) {
    return '<div class="gallery-item"><img src="' + s + '" loading="lazy" onclick="openLightbox(\'' + s + '\')"></div>';
  }).join('');
}
function openLightbox(src) {
  var lb = document.getElementById('galleryLightbox');
  var img = document.getElementById('lightboxImg');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('show');
  lb.style.display = 'flex';
}
function closeLightbox() {
  var lb = document.getElementById('galleryLightbox');
  if (!lb) return;
  lb.classList.remove('show');
  lb.style.display = 'none';
}
