App({
  onLaunch() {
    // 初始化本地存储
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      const newUserId = 'user_' + Math.random().toString(36).substr(2, 9);
      wx.setStorageSync('userId', newUserId);
    }
    
    const comments = wx.getStorageSync('comments');
    if (!comments) {
      wx.setStorageSync('comments', []);
    }
  },
  globalData: {
    userInfo: null
  }
})
