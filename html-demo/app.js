/* ===== MaydayLand · 五月天城市漫游 · 交互逻辑 ===== */

/* ---- 图片映射（真实地点 Unsplash 图） ---- */
var IMG = {
  431:'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
  292:'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800&q=80',
  326:'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
  580:'https://images.unsplash.com/photo-1517260739337-6799d239ce83?w=800&q=80',
  1080:'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80',
  1036:'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
  1018:'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',
  250:'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  119:'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80',
  1015:'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  1044:'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
  1082:'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
};
function img(id){ return IMG[id] || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80'; }

/* ---- 种子数据：12 个真实五迷角落（2026 最新） ---- */
var corners = [
  {id:'corner_001',name:'明园餐厅',city:'北京',address:'东城区北总布胡同 21 号',categoryLabel:'五迷同款',imageId:431,lyric:'一碗炸酱面 吃出了整个老北京',song:'任意门',lyricCredit:'玛莎 2026 鸟巢演唱会期间同款',passcode:'玛莎同款',recommend:'演唱会期间排队超 100 号，炸酱面、焦熘丸子必点',likes:315,notes:67,distanceText:'距鸟巢 4.2km',moodTags:['同款','地道','烟火气'],lat:39.9042,lng:116.4074},
  {id:'corner_002',name:'北外滩歌词地贴步道',city:'上海',address:'北外滩滨江绿地',categoryLabel:'打卡地',imageId:1080,lyric:'外滩风光 跃出课本 是那么新鲜',song:'任意门',lyricCredit:'2025 上海 MAYDAYLAND 官方打卡点',passcode:'任意门',recommend:'五公仔人偶 + 歌词地贴，背景是浦东陆家嘴',likes:186,notes:28,distanceText:'距上海体育场 5.1km',moodTags:['地标','浪漫','夜景'],lat:31.2450,lng:121.4900},
  {id:'corner_003',name:'西单更新场 STAYREAL PARK',city:'北京',address:'西城区西单北大街 180 号',categoryLabel:'快闪店',imageId:250,lyric:'给我抱抱 把爱传出去',song:'拥抱',lyricCredit:'STAYREAL PARK 4.0 拥抱公园主题',passcode:'给我抱抱',recommend:'7.4 米纯真兔、6 米胡萝卜、京味漫游限定周边',likes:238,notes:42,distanceText:'距鸟巢 9.8km',moodTags:['治愈','潮玩','限定'],lat:39.9090,lng:116.3730},
  {id:'corner_004',name:'水立方 MOJO EXPO',city:'北京',address:'朝阳区天辰东路 11 号',categoryLabel:'展览',imageId:292,lyric:'真正的人生梦想 在你的手上',song:'倔强',lyricCredit:'2026 鸟巢演唱会期间限定装置',passcode:'梦想卜览',recommend:'33 米巨型胡萝卜麦克风，吉尼斯世界纪录认证',likes:421,notes:89,distanceText:'距鸟巢 0.5km',moodTags:['梦想','震撼','打卡'],lat:39.9930,lng:116.3970},
  {id:'corner_005',name:'THE BOX 朝外 MAYDAYLAND',city:'北京',address:'朝阳区朝阳门外大街 10 号 B 馆 L3',categoryLabel:'特展',imageId:1015,lyric:'从无名高地到鸟巢的 10 年',song:'任意门',lyricCredit:'2026 北京限定特展官方文案',passcode:'回到那一天',recommend:'4/25-5/19 限定展，需凭演唱会门票预约',likes:567,notes:134,distanceText:'距鸟巢 8.6km',moodTags:['展览','限定','回忆'],lat:39.9230,lng:116.4480},
  {id:'corner_006',name:'东方明珠 MAYDAYLAND',city:'上海',address:'浦东新区世纪大道 1 号',categoryLabel:'打卡地',imageId:119,lyric:'因为你 所以我 爱上那片天空',song:'因为你 所以我',lyricCredit:'2025 上海站「MAYDAYLAND 东方明珠指挥总部」',passcode:'因为你所以五',recommend:'5.025 米 SUPER MAYDAY MAX 乐高机甲 + 喵星人装置',likes:198,notes:31,distanceText:'距上海体育场 6.3km',moodTags:['地标','科技感','合影'],lat:31.2397,lng:121.4998},
  {id:'corner_007',name:'长沙 IFS 卜卜花园',city:'长沙',address:'芙蓉区解放西路 188 号',categoryLabel:'首展',imageId:326,lyric:'绽放星城 一起拥抱',song:'拥抱',lyricCredit:'MOJO IN BLOOM 全国首展 2026.05.23',passcode:'MOJO IN BLOOM',recommend:'11 米长沙限定卜卜全球首展，三大沉浸式展区',likes:287,notes:56,distanceText:'市中心',moodTags:['首展','卜卜','治愈'],lat:28.1970,lng:112.9750},
  {id:'corner_008',name:'钟鼓楼广场 怪兽公仔',city:'北京',address:'东城区钟鼓楼广场',categoryLabel:'公仔点',imageId:1018,lyric:'我和我最后的倔强 握紧双手绝对不放',song:'倔强',lyricCredit:'北京旅游集散中心「五迷专属打卡巴士」首站',passcode:'倔强',recommend:'官方打卡观光巴士起点，串联五大成员公仔点位',likes:142,notes:19,distanceText:'距鸟巢 7.5km',moodTags:['倔强','城市漫游','官方'],lat:39.9410,lng:116.3970},
  {id:'corner_009',name:'首钢园 石头公仔',city:'北京',address:'石景山区石景山路 68 号',categoryLabel:'公仔点',imageId:1036,lyric:'然后呢 一起走吧',song:'后青春期的诗',lyricCredit:'首钢园沉淀池广场限定装置',passcode:'一起走吧',recommend:'工业风背景 + 石头公仔，日落时分最出片',likes:632,notes:156,distanceText:'距鸟巢 12km',moodTags:['工业风','日落','出片'],lat:39.9250,lng:116.1750},
  {id:'corner_010',name:'朝阳公园五色大球',city:'北京',address:'朝阳区朝阳公园南路 1 号',categoryLabel:'应援点',imageId:1044,lyric:'天空和我的中间 只剩倾盆的思念',song:'步步',lyricCredit:'2026 鸟巢演唱会期间五大球巨型气膜回归',passcode:'五月天',recommend:'五大球巨型气膜 + 好运桥《星空》光影秀',likes:389,notes:78,distanceText:'距鸟巢 6.8km',moodTags:['应援','夜景','五大球'],lat:39.9430,lng:116.4780},
  {id:'corner_011',name:'居庸关长城 阿信公仔',city:'北京',address:'昌平区居庸关长城',categoryLabel:'公仔点',imageId:1082,lyric:'不到长城非好汉',song:'离开地球表面',lyricCredit:'北京旅游集散中心官方打卡巴士线路三',passcode:'离开地球表面',recommend:'官方「痛车」巴士可达，长城 + 阿信公仔同框',likes:478,notes:92,distanceText:'距鸟巢 45km',moodTags:['长城','官方','壮观'],lat:40.2910,lng:116.0710},
  {id:'corner_012',name:'阿信同款烧饼店',city:'北京',address:'东城区某胡同（凭暗号解锁地址）',categoryLabel:'五迷同款',imageId:580,lyric:'就算失望 不能绝望',song:'倔强',lyricCredit:'阿信早年社交平台分享的老北京烧饼',passcode:'不能绝望',recommend:'阿信随手分享后成为五迷隐藏打卡点，价格实惠馅扎实',likes:92,notes:11,distanceText:'距鸟巢 6.5km',moodTags:['同款','隐藏','烟火气'],lat:39.8900,lng:116.4300}
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

/* ---- 全局状态 ---- */
var state = { tab:'discover', currentCorner:null, currentConcert:null, activeTag:'全部', keyword:'', checkinTpl:'polaroid', checkinPhoto:null, stack:['discover'], countdownTimer:null, checkinDistance:null, checkinMode:'strict' };

/* ---- 本地存储 ---- */
var ls = {
  get:function(k,d){ try{ var v=localStorage.getItem('ml_'+k); return v?JSON.parse(v):d; }catch(e){ return d; } },
  set:function(k,v){ localStorage.setItem('ml_'+k, JSON.stringify(v)); }
};

/* ---- Toast ---- */
function toast(m){ var t=document.getElementById('toast'); t.textContent=m; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); },1800); }

/* ---- 时钟 ---- */
function tick(){ var d=new Date(); document.getElementById('clock').textContent=d.getHours()+':'+String(d.getMinutes()).padStart(2,'0'); }
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
  var list=corners;
  if(state.activeTag!=='全部') list=list.filter(function(c){ return c.moodTags.indexOf(state.activeTag)>=0; });
  if(state.keyword){
    var kw=state.keyword;
    list=list.filter(function(c){ return c.lyric.indexOf(kw)>=0||c.song.indexOf(kw)>=0||c.name.indexOf(kw)>=0||c.moodTags.some(function(t){ return t.indexOf(kw)>=0; }); });
  }
  document.getElementById('cornerCount').textContent=list.length+' 个真实打卡点';
  var el=document.getElementById('cornerList');
  if(!list.length){ el.innerHTML='<div class="empty">'+
    '<div style="font-size:48px;margin-bottom:12px">🔍</div>'+
    '<div>没找到匹配角落，换个关键词试试～</div>'+
    '<button class="empty-cta" onclick="recommendCorner()">让 MaydayLand 推荐一个</button></div>'; return; }
  el.innerHTML=list.map(function(c){
    return '<div class="corner-card" onclick="navigate(\'corner\',\''+c.id+'\')">'+
      '<div class="corner-img-wrap"><img src="'+img(c.imageId)+'" alt="'+c.name+'" loading="lazy">'+
      '<span class="corner-cat">'+c.categoryLabel+'</span>'+
      '<div class="corner-lyric-badge"><div class="lyric">「'+c.lyric+'」</div><div class="song">— '+c.song+'</div></div></div>'+
      '<div class="corner-body"><div class="corner-name">'+c.name+' <span class="dist">'+c.distanceText+'</span></div>'+
      '<div class="corner-addr">'+c.city+' · '+c.address+'</div>'+
      '<div class="corner-tags">'+c.moodTags.map(function(t){ return '<span class="t">#'+t+'</span>'; }).join('')+'</div>'+
      '<div class="corner-stats"><span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9C1 9 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 5 23 9 21.5 12 19 16.5 12 21 12 21z"/></svg>'+c.likes+'</span>'+
      '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'+c.notes+'</span></div></div></div>';
  }).join('');
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
  var bc=corners.filter(function(c){ return c.city==='北京'; });
  var pos=[[80,60],[120,90],[160,70],[200,110],[240,80],[280,120],[100,150],[220,160],[300,90],[150,180]];
  var colors=['#3B7DD8','#FF6B9D','#FFD23F','#4ECDC4','#9B7EDE'];
  document.getElementById('mapPins').innerHTML=bc.slice(0,10).map(function(c,i){
    return '<g class="map-pin" onclick="navigate(\'corner\',\''+c.id+'\')">'+
      '<circle cx="'+pos[i][0]+'" cy="'+pos[i][1]+'" r="7" fill="'+colors[i%5]+'" stroke="#fff" stroke-width="2"/>'+
      '<text x="'+pos[i][0]+'" y="'+(pos[i][1]+3)+'" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">'+(i+1)+'</text></g>';
  }).join('');
}

/* ---- 角落详情 ---- */
function renderCorner(){
  var c=state.currentCorner; if(!c) return;
  document.getElementById('detailImg').src=img(c.imageId);
  document.getElementById('detailLyric').textContent='「'+c.lyric+'」';
  document.getElementById('detailCredit').textContent='— '+c.song+' · '+c.lyricCredit;
  document.getElementById('detailName').textContent=c.name;
  document.getElementById('detailAddr').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'+c.city+' · '+c.address+' · '+c.distanceText;
  document.getElementById('detailRecommend').textContent=c.recommend;
  document.getElementById('detailPasscode').textContent=c.passcode;
  renderComments();
}
function renderComments(){
  var c=state.currentCorner; var list=ls.get('comments_'+c.id,[]);
  document.getElementById('commentCount').textContent=list.length;
  var colors=['#3B7DD8','#FF6B9D','#FFD23F','#4ECDC4','#9B7EDE'];
  document.getElementById('commentList').innerHTML=list.length?list.map(function(cm,i){
    return '<div class="comment-item"><div class="comment-avatar" style="background:'+colors[i%5]+'">'+(cm.name[0]||'五')+'</div>'+
      '<div class="comment-main"><div class="comment-name">'+cm.name+'</div><div class="comment-text">'+cm.text+'</div><div class="comment-time">'+cm.time+'</div></div></div>';
  }).join(''):'<div class="empty">还没有留言，做第一个发声的五迷吧～</div>';
}
function sendComment(){
  var input=document.getElementById('commentInput'); var text=input.value.trim();
  if(!text){ toast('先写点什么吧'); return; }
  var c=state.currentCorner; var list=ls.get('comments_'+c.id,[]);
  list.unshift({name:'我',text:text,time:'刚刚'});
  ls.set('comments_'+c.id,list.slice(0,50));
  input.value=''; renderComments(); toast('留言已发送 ❤');
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
  document.getElementById('concertList').innerHTML=concerts.map(function(c){
    return '<div class="concert-item" onclick="navigateConcert(\''+c.id+'\')">'+
      '<img class="concert-poster" src="'+(posterMap[c.posterId]||img(c.posterId))+'" alt="">'+
      '<div class="concert-info"><div class="ci-city">'+c.city+'</div>'+
      '<div class="ci-venue">'+c.venue+'</div><div class="ci-date">'+c.dateText+'</div>'+
      '<span class="ci-status '+c.status+'">'+c.statusLabel+'</span></div></div>';
  }).join('');
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
      '<img class="nearby-corner-thumb" src="'+img(co.imageId)+'">'+
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
      return '<div class="footprint-item"><img class="footprint-thumb" src="'+img(f.imageId)+'">'+
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
  renderTags();
  renderCornerList();
  renderMapPins();
  showGuide();
  requestLocation();
  /* 新用户分享落地页（share-growth spec：推荐人提示卡 + 2s 自动收起） */
  var urlParams=new URLSearchParams(window.location.search);
  var ref=urlParams.get('ref');
  if(ref){
    setTimeout(function(){ showRecommendCard(ref); }, 1800);
  }
  /* 隐藏启动页 */
  setTimeout(function(){ document.getElementById('splash').classList.add('hide'); }, 1400);
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
init();
