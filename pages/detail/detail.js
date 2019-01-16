// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    food:{}
  },
  onLoad: function (options){
    let that=this;
    this.FoodDetail(options);
  },
  FoodDetail: function (options){
    let that=this;
    wx.request({
      url: 'https://wxchat.weblyff.cn/food/food_detail.php',
      method: "POST",
      data:{
        'food_id':options.food_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, 
      success: function (res) {
        console.log(res.data)
        var food = JSON.parse(res.data[0].food)
        that.setData({
          detail:res.data[0],
          food:food
        });
        console.log(that.data.food);
        wx.hideLoading();
        //console.log(that.data.food);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      fail: function (res) {
        console.log(res)
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})