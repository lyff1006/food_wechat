// pages/index/BdAudio/BdAudio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  GetAudio:function(){
    wx.getFileInfo({
      success(res) {
        console.log(res);
        console.log(res.size);
        console.log(res.digest);
      }
    })
  },
  UploadAudio:function(){
    let that = this;
    wx.showLoading({
      title: '努力识别中~',
    })
    wx.uploadFile({
      url: 'http://www.weblyff.cn/php/bdai/audio/audio.php', //仅为示例，非真实的接口地址  
      //http://www.weblyff.cn/php/bdai/audio/audio.php
      filePath: that.data.img_src[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        let imgres = JSON.parse(res.data);
        that.setData({
          img_res: imgres,
          length_res: imgres.length
        })
        wx.hideLoading();
        console.log(that.data.img_res);
        console.log(that.data.length_res);
        //do something
      },
      fail() {
        console.log(that.data.img_src)
        if (that.data.img_src == "http://images.weblyff.cn/no_img.jpg") {
          wx.showToast({
            title: '请选择图片',
            icon: 'loading',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '识别失败',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})