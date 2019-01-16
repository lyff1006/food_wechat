// pages/index/BdImage/BdImage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src:"http://images.weblyff.cn/no_img.jpg",
    classify:"",
    img_res:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      classify: options.class
    });
    console.log("options.class：" + options.class)
    wx.setNavigationBarTitle({
      title: this.data.classify,
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ChooseImg:function(){
    let that=this;
    wx.chooseImage({
      success(res) {
        that.setData({
          img_src: res.tempFilePaths
        })
        console.log(that.data.img_src);
        wx.showToast({
          title: '更换成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail(res){
        console.log(res);
        wx.showToast({
          title: '更换失败',
          icon:'loading',
          duration:1500,
        })
      }
    })
    
  },
  Search:function(event){
    wx.navigateTo({
      url: '../list/list?search='+event.target.dataset.name,
    })
  },
  UploadImg:function(){
    let that=this;
    wx.showLoading({
      title: '努力识别中~',
    })
    wx.uploadFile({
      url: 'https://wxchat.weblyff.cn/bdai/image/images/uplodeimages1.php', //仅为示例，非真实的接口地址  
      //http://www.weblyff.cn/php/bdai/image/images/uplodeimages1.php
      filePath: that.data.img_src[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        let imgres = JSON.parse(res.data);
        console.log(imgres[0].food_name)
        if (imgres[0].food_name =="非菜"){
          wx.showToast({
            title: '识别失败',
            icon: 'loading',
            duration: 2000
          })
        }else{
          that.setData({
            img_res: imgres,
            length_res: imgres.length
          })
          wx.hideLoading();
          console.log(that.data.img_res);
          //console.log(that.data.length_res);
          //do something
        }
        
      },
      fail(){
        console.log(that.data.img_src)
        if (that.data.img_src =="http://images.weblyff.cn/no_img.jpg"){
          wx.showToast({
            title: '请选择图片',
            icon: 'loading',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '识别失败',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },
})