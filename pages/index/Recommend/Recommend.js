//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
    let that = this;
    setTimeout(function () {
      that.ContinueGetFood();
    }, 1500)
  },
  GetFood: function () {
    let that = this;
    wx.request({
      url: 'https://wxchat.weblyff.cn/food/food_recommend.php',
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
  ContinueGetFood: function () {
    var that = this;
    wx.request({
      url: 'https://wxchat.weblyff.cn/food/food_recommend.php', //仅为示例，并非真实的接口地址
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
  onLoad: function () {
    this.GetFood();
  }
})
