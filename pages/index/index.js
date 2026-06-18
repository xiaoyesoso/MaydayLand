const mockSchedule = require('../../mock/schedule.js');
const mockNews = require('../../mock/news.js');

// 五球配色体系
const SPHERE_COLORS = ['#ff8eb3', '#ff9e4a', '#ffdc4a', '#77d37a', '#66b3ff'];
const SPHERE_EMOJIS = ['🎸', '🎤', '🥁', '🎹', '🎸'];

Page({
  data: {
    schedule: [],
    filteredSchedule: [],
    selectedScheduleId: null,
    selectedSchedule: null,
    squareFeed: [],
    commentText: '',
    userId: '',
    scrollTop: 0,
    showBackTop: false,
    showPostModal: false,
    replyingToId: null,
    replyingToName: '',
    tempImages: [],
    // Filter states
    filterKeyword: '',
    filterCity: '',
    filterDate: '',
    showSquare: false, // Control showing square feed instead of schedule list
    currentTab: 'schedule', // 'schedule', 'media', 'my'
    mediaFeed: [],
    myFeed: [],
    // Post Modal
    postScheduleId: null, // Schedule ID selected in post modal
    postScheduleIndex: 0, // Index for picker
  },

  onLoad(options) {
    this.setData({
      userId: wx.getStorageSync('userId') || 'user_' + Math.random().toString(36).substr(2, 9)
    });
    if (!wx.getStorageSync('userId')) {
      wx.setStorageSync('userId', this.data.userId);
    }
    
    this.fetchSchedule();
    this.fetchNews();

    if (options.sharedComment && options.scheduleId) {
      this.handleSharedComment(decodeURIComponent(options.sharedComment), options.scheduleId);
    }
  },

  // 切换 Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (this.data.currentTab === tab) return;
    
    this.setData({ 
      currentTab: tab,
      showSquare: false, // 切换全局 Tab 时退出具体场次广场
      scrollTop: 0
    });

    if (tab === 'media') {
      this.fetchMediaFeed();
    } else if (tab === 'my') {
      this.fetchMyFeed();
    }
  },

  // 获取媒体流数据
  fetchMediaFeed() {
    const allComments = wx.getStorageSync('comments') || [];
    // 过滤出包含媒体内容的动态
    const mediaComments = allComments.filter(c => c.images && c.images.length > 0).map(c => {
      const style = this.getUserStyle(c.userId);
      const schedule = this.data.schedule.find(s => s.id === c.scheduleId);
      return {
        ...c,
        author: '五迷_' + (c.userId ? c.userId.substr(-4) : '匿名'),
        avatarColor: style.color,
        emoji: style.emoji,
        cityName: schedule ? schedule.city : '未知站',
        likes: c.likes || 0,
        isLiked: (wx.getStorageSync('likes') || []).includes(c.id)
      };
    });

    // 按时间排序
    const mediaFeed = mediaComments.sort((a, b) => new Date(b.time) - new Date(a.time));
    this.setData({ mediaFeed });
  },

  // 获取我的动态数据
  fetchMyFeed() {
    const allComments = wx.getStorageSync('comments') || [];
    const myComments = allComments.filter(c => c.userId === this.data.userId).map(c => {
      const style = this.getUserStyle(c.userId);
      const schedule = this.data.schedule.find(s => s.id === c.scheduleId);
      return {
        ...c,
        author: '我',
        avatarColor: style.color,
        emoji: style.emoji,
        cityName: schedule ? schedule.city : '未知站',
        likes: c.likes || 0,
        isLiked: (wx.getStorageSync('likes') || []).includes(c.id),
        replies: (c.replies || []).map(r => {
          const rStyle = this.getUserStyle(r.userId);
          return {
            ...r,
            userName: r.userId === this.data.userId ? '我' : '五迷_' + (r.userId ? r.userId.substr(-4) : '匿名'),
            avatarColor: rStyle.color
          };
        })
      };
    });

    const myFeed = myComments.sort((a, b) => new Date(b.time) - new Date(a.time));
    this.setData({ myFeed });
  },

  // 过滤日程
  onFilterInput(e) {
    this.setData({ filterKeyword: e.detail.value }, this.applyFilters);
  },

  onFilterCity(e) {
    this.setData({ filterCity: e.detail.value }, this.applyFilters);
  },

  onFilterDate(e) {
    this.setData({ filterDate: e.detail.value }, this.applyFilters);
  },

  applyFilters() {
    const { schedule, filterKeyword, filterCity, filterDate } = this.data;
    const filtered = schedule.filter(item => {
      const matchKeyword = !filterKeyword || 
        item.tourName.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        item.venue.toLowerCase().includes(filterKeyword.toLowerCase());
      const matchCity = !filterCity || item.city.includes(filterCity);
      const matchDate = !filterDate || item.date === filterDate;
      return matchKeyword && matchCity && matchDate;
    });
    this.setData({ filteredSchedule: filtered });
  },

  // 选择场馆
  selectSchedule(e) {
    const id = e.currentTarget.dataset.id;
    const selected = this.data.schedule.find(s => s.id === id);
    this.setData({
      selectedScheduleId: id,
      selectedSchedule: selected,
      showSquare: true // 直接进入广场
    });
    this.filterContent();
  },

  // 返回日程列表
  goBackToList() {
    this.setData({
      showSquare: false,
      scrollTop: 0
    });
  },

  // 获取用户特征色和表情
  getUserStyle(userId) {
    if (!userId) return { color: '#eee', emoji: '🎸' };
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % SPHERE_COLORS.length;
    return {
      color: SPHERE_COLORS[index],
      emoji: SPHERE_EMOJIS[index]
    };
  },

  // 过滤内容并合并到广场
  filterContent() {
    const scheduleId = this.data.selectedScheduleId;
    
    // 1. 获取官方动态
    const news = (this.data.news || []).filter(n => n.scheduleId === scheduleId).map(n => ({
      ...n,
      type: 'official',
      author: '官方公告',
      avatarColor: '#ffdc4a',
      emoji: '📢',
      likes: Math.floor(Math.random() * 100) + 50
    }));
    
    // 2. 获取用户评论
    const allComments = wx.getStorageSync('comments') || [];
    const comments = allComments.filter(c => c.scheduleId === scheduleId).map(c => {
      const style = this.getUserStyle(c.userId);
      return {
        ...c,
        type: 'user',
        author: '五迷_' + (c.userId ? c.userId.substr(-4) : '匿名'),
        avatarColor: style.color,
        emoji: style.emoji,
        content: c.text,
        likes: c.likes || 0,
        isLiked: (wx.getStorageSync('likes') || []).includes(c.id),
        replies: (c.replies || []).map(r => {
          const rStyle = this.getUserStyle(r.userId);
          return {
            ...r,
            userName: '五迷_' + (r.userId ? r.userId.substr(-4) : '匿名'),
            avatarColor: rStyle.color
          };
        })
      };
    });
    
    // 3. 合并并按时间排序 (官方优先，然后是时间)
    const squareFeed = [...news, ...comments].sort((a, b) => {
      if (a.type === 'official' && b.type !== 'official') return -1;
      if (a.type !== 'official' && b.type === 'official') return 1;
      return new Date(b.time) - new Date(a.time);
    });
    
    this.setData({ squareFeed });
  },

  // 开始回复
  startReply(e) {
    const { id, name } = e.currentTarget.dataset;
    this.setData({
      showPostModal: true,
      replyingToId: id,
      replyingToName: name,
      commentText: ''
    });
  },

  // 打开发布弹窗
  openPostModal() {
    let postScheduleId = this.data.selectedScheduleId;
    let postScheduleIndex = 0;
    
    // 如果是从广场或我的动态打开，且没有选中场次，默认选第一个
    if (!postScheduleId && this.data.schedule.length > 0) {
      postScheduleId = this.data.schedule[0].id;
    }
    
    if (postScheduleId) {
      postScheduleIndex = this.data.schedule.findIndex(s => s.id === postScheduleId);
    }

    this.setData({
      showPostModal: true,
      replyingToId: null,
      replyingToName: '',
      commentText: '',
      tempImages: [],
      postScheduleId,
      postScheduleIndex
    });
  },

  // 选择关联日程
  onPostScheduleChange(e) {
    const index = e.detail.value;
    const schedule = this.data.schedule[index];
    this.setData({
      postScheduleIndex: index,
      postScheduleId: schedule.id
    });
  },

  // 关闭发布弹窗
  closePostModal() {
    this.setData({
      showPostModal: false,
      replyingToId: null,
      replyingToName: '',
      commentText: '',
      tempImages: []
    });
  },

  // 点赞功能
  toggleLike(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.squareFeed.find(f => f.id === id);
    
    if (item && item.type === 'official') {
      wx.showToast({ title: '官方公告已收到你的爱心', icon: 'none' });
      return;
    }

    let likes = wx.getStorageSync('likes') || [];
    let allComments = wx.getStorageSync('comments') || [];
    const index = allComments.findIndex(c => c.id === id);
    
    if (index === -1) return;

    if (likes.includes(id)) {
      likes = likes.filter(l => l !== id);
      allComments[index].likes = Math.max(0, (allComments[index].likes || 1) - 1);
    } else {
      likes.push(id);
      allComments[index].likes = (allComments[index].likes || 0) + 1;
    }

    wx.setStorageSync('likes', likes);
    wx.setStorageSync('comments', allComments);
    this.filterContent();
  },

  // 选择图片/视频/实况
  chooseImage() {
    wx.chooseMedia({
      count: 9 - this.data.tempImages.length,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFiles.map(file => ({
          url: file.tempFilePath,
          type: file.fileType
        }));
        this.setData({
          tempImages: [...this.data.tempImages, ...newImages]
        });
      }
    });
  },

  // 移除图片
  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const tempImages = this.data.tempImages;
    tempImages.splice(index, 1);
    this.setData({ tempImages });
  },

  // 预览图片
  previewImage(e) {
    const { url, list } = e.currentTarget.dataset;
    const urls = list ? list.map(img => img.url || img) : [url];
    wx.previewImage({
      current: url,
      urls: urls
    });
  },

  sendComment() {
    const text = this.data.commentText.trim();
    if (!text && this.data.tempImages.length === 0) {
      wx.showToast({ title: '请输入内容或上传图片', icon: 'none' });
      return;
    }

    let allComments = wx.getStorageSync('comments') || [];

    if (this.data.replyingToId) {
      const targetIndex = allComments.findIndex(c => c.id === this.data.replyingToId);
      if (targetIndex !== -1) {
        const reply = {
          id: Date.now(),
          userId: this.data.userId,
          text: text,
          time: new Date().toLocaleString()
        };
        allComments[targetIndex].replies = [...(allComments[targetIndex].replies || []), reply];
      }
    } else {
      const newComment = {
        id: Date.now(),
        scheduleId: this.data.postScheduleId,
        text: text,
        images: this.data.tempImages,
        userId: this.data.userId,
        time: new Date().toLocaleString(),
        likes: 0,
        replies: []
      };
      allComments = [newComment, ...allComments];
    }

    wx.setStorageSync('comments', allComments);
    this.closePostModal();
    
    // 刷新当前视图数据
    if (this.data.showSquare) {
      this.filterContent();
    } else if (this.data.currentTab === 'media') {
      this.fetchMediaFeed();
    } else if (this.data.currentTab === 'my') {
      this.fetchMyFeed();
    }

    wx.showToast({ title: '发送成功', icon: 'success' });
  },

  // 模拟请求
  fetchSchedule() {
    const schedule = mockSchedule;
    this.setData({ 
      schedule,
      filteredSchedule: schedule,
      selectedScheduleId: schedule[0].id,
      selectedSchedule: schedule[0]
    });
    this.filterContent();
  },

  fetchNews() {
    this.setData({ news: mockNews });
    this.filterContent();
  },

  // 滚动监听
  onScroll(e) {
    const isShow = e.detail.scrollTop > 300;
    if (isShow !== this.data.showBackTop) {
      this.setData({ showBackTop: isShow });
    }
  },

  onInputComment(e) {
    this.setData({ commentText: e.detail.value });
  },

  handleSharedComment(sharedComment, scheduleId) {
    const schedule = this.data.schedule.find(s => s.id == scheduleId);
    const cityName = schedule ? schedule.city : '未知站';
    
    wx.showModal({
      title: `来自好友的分享 (${cityName})`,
      content: sharedComment,
      confirmText: '我也看看',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            selectedScheduleId: parseInt(scheduleId),
            selectedSchedule: schedule,
            showSquare: true
          });
          this.filterContent();
        }
      }
    });
  },

  onShareAppMessage() {
    const lastUserPost = this.data.squareFeed.find(f => f.type === 'user');
    const shareText = lastUserPost ? lastUserPost.content : '快来五月天场馆广场互动吧！';
    return {
      title: `五月天演唱会互动-${this.data.selectedSchedule.city}站`,
      path: `/pages/index/index?userId=${this.data.userId}&scheduleId=${this.data.selectedScheduleId}&sharedComment=${encodeURIComponent(shareText)}`
    };
  }
});