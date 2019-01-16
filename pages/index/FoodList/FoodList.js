var app = getApp();


Page({
  data: {
    current: 0,
    // 左侧菜单
    tabList: [],
    // 右侧内容
    contList: [],
  },

  // 循环切换
  forTab(index) {
    let lens = this.data.tabList.length;
    let _id = 't' + index;
    for (let i = 0; i < lens; i++) {
      this.data.tabList[i]['checked'] = false;
    }
    this.data.tabList[index]['checked'] = true;
    this.setData({
      tabList: this.data.tabList,
      toView: _id,
      current: index
    });
  },

  // 点击左侧菜单栏
  intoTab(e) {
    let lens = this.data.tabList.length;
    let _index = e.currentTarget.dataset.index;
    this.forTab(_index);
    let _id = 't' + _index;
    this.setData({
      toViewRt: _id
    });
  },

  // 滚动右侧菜单
  scrollRight(e) {
    //console.log(e)
    let _top = e.detail.scrollTop;
    let progress = Math.ceil(parseInt(_top / this.data.ht)) ; // 计算出 当前的下标
    if (progress > this.data.current) { // 向上拉动屏幕

      this.setData({ current: progress });
      this.forTab(this.data.current);
    } else if (progress == this.data.current) {
      return false;
    } else { // 向下拉动屏幕

      this.setData({
        current: progress == 0 ? 0 : progress--
      });
      this.forTab(progress);
    }
  },

  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://wxchat.weblyff.cn/food/food_index.php',
      method: 'GET',
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          if (i == 0) {
            var obj = { title: res.data[i].info, checked: true };
          } else {
            var obj = { title: res.data[i].info, checked: false };
          }
          var info_list = JSON.parse(res.data[i].list);
          var obj1 = { cont: res.data[i].info, info: info_list }
          that.setData({
            tabList: that.data.tabList.concat(obj),
            contList: that.data.contList.concat(obj1)
          })
        }
        console.log(that.data.contList);
      }
    })
    // 框架尺寸设置
    wx.getSystemInfo({
      success: (options) => {
        var wd = options.screenWidth; // 页面宽度
        var ht = '1390';//options.windowHeight; // 页面高度
        var ht1 = options.windowHeight; // 页面高度
        this.setData({ wd: wd, ht: ht ,ht1:ht1})
      }
    });
    
  },

  onShow: function () {
    // 初始化状态
    this.setData({
      toView: 't' + this.data.current,
      toViewRt: 't' + this.data.current
    })
  },

})
