//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    
  },
  onShareAppMessage: function () {
    return {
      desc: '速看微小说——最好用的微小说小程序!',
    }
  }
  
  
})
