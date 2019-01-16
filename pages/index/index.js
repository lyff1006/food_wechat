//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ImgBox:[
      'http://images.weblyff.cn/food1.jpg',
      'http://images.weblyff.cn/food2.jpg',
      'http://images.weblyff.cn/food3.jpg',
      'http://images.weblyff.cn/food4.jpg',
    ],
    IconArray1: [
      { img: 'http://images.weblyff.cn/分类.png', name: "分类", path: "./FoodList/FoodList" },
      { img: 'http://images.weblyff.cn/推荐.png', name: "推荐", path: "./Recommend/Recommend" },
      { img: 'http://images.weblyff.cn/餐厅.png', name: "附近美食", path: "./Nearby/Nearby" },
      { img: 'http://images.weblyff.cn/放大镜.png', name: "图片识别", path: "./BdImage/BdImage" },
    ],
    /*IconArray1: [
      { img: 'http://images.weblyff.cn/分类.png', name: "分类", path: "./FoodList/FoodList" },
      { img: 'http://images.weblyff.cn/推荐.png', name: "推荐", path: "./Recommend/Recommend" },
      { img: 'http://images.weblyff.cn/视频.png', name: "视频", path: "./FoodVideo/FoodVideo" },
      { img: 'http://images.weblyff.cn/最新.png', name: "最新", path: "./New/New" },
    ],
    IconArray2: [
      { img: 'http://images.weblyff.cn/放大镜.png', name: "图片识别", path: "./BdImage/BdImage" },
      { img: 'http://images.weblyff.cn/语音.png', name: "语音识别", path: "./BdAudio/BdAudio" },
      { img: 'http://images.weblyff.cn/餐厅.png', name: "附近美食", path: "./Nearby/Nearby" },
      { img: 'http://images.weblyff.cn/新闻.png', name: "新闻常识", path: "./Knowledge/Knowledge" },
    ],*/
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      that.GetFood();
    }, 1500) 
  },
  //上拉加载
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that=this;
    setTimeout(function(){
      that.ContinueGetFood();
    },1500) 
  },
  GetFood:function(){
    let that = this;
    wx.request({
      url: 'https://wxchat.weblyff.cn/food/food_guess.php',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          food: res.data
        });
        wx.hideLoading();
        console.log(that.data.food);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'loading',
          duration: 2000
        })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  ContinueGetFood:function(){
    var that = this;
    wx.request({
      url: 'https://wxchat.weblyff.cn/food/food_guess.php', //仅为示例，并非真实的接口地址
      data: {
        /*x: '',
        y: ''*/
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        for (var i = 0; i <= res.data.length - 1; i++) {
          that.setData({
            'food': that.data.food.concat(res.data[i])
          });
        }
        wx.hideLoading();
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'loading',
          duration: 2000
        })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })  
  },
  onLoad:function(){
    this.GetFood();
  }



  //事件处理函数
  /*bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }*/
})
