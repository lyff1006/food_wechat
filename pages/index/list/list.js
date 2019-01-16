// pages/index/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {},
    list_length: '',
  },
  onLoad:function(option){
    let that=this;
    console.log(option);
    that.setData({
      search_data: option.search,
      page: 0
    });
    that.SearchFood();
  },
  SearchFood: function () {
    let that = this;
    console.log(that.data.search_data);
    if (that.data.search_data == null) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://wxchat.weblyff.cn/food/food_search.php',
        method: "post",
        data: {
          search: that.data.search_data,
          page: that.data.page * 1 + 1
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          if (res.data.arr_food.length<1){
            //wx.hideLoading();
            wx.showToast({
              title: '没有更多',
              icon: 'loading',
              duration: 2000
            })
          }
          else if(res.data.page == 1) {
            that.setData({
              food: res.data.arr_food,
              page: res.data.page,
              list_length: res.data.count,
            });
          } else {
            for (var i = 0; i <= res.data.arr_food.length - 1; i++) {
              that.setData({
                food: that.data.food.concat(res.data.arr_food[i]),
                page: res.data.page,
              });
            }
          }

          wx.hideLoading();
        },
        fail: function (res) {
          wx.showToast({
            title: '加载失败',
            icon: 'loading',
            duration: 2000
          })
        }
      })
    }

  },
  //上拉加载
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    setTimeout(function () {
      that.SearchFood();
    }, 1500)
  },
  onShareAppMessage: function () {

  }
})