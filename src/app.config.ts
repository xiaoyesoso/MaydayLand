export default defineAppConfig({
  pages: [
    'pages/discover/index',
    'pages/map/index',
    'pages/concert/index',
    'pages/mine/index',
    'pages/corner/index',
    'pages/checkin/index',
    'pages/submit/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: '#f8f6f0',
    navigationBarBackgroundColor: '#2d2a24',
    navigationBarTitleText: 'MaydayLand · 城市漫游',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#a39e91',
    selectedColor: '#2d2a24',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/discover/index', text: '发现' },
      { pagePath: 'pages/map/index', text: '地图' },
      { pagePath: 'pages/concert/index', text: '演唱会' },
      { pagePath: 'pages/mine/index', text: '我的' }
    ]
  }
})
