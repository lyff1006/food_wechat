var amapFile = require('../../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    scale: 19,
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '49a53be3fe60f5b866e307a3b7849435' });
    myAmapFun.getPoiAround({
      querykeywords: '餐厅',
      iconPathSelected: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png', //如：..­/..­/img/marker_checked.png
      iconPath: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png', //如：..­/..­/img/marker.png
      success: function (data) {
        markersData = data.markers;
        console.log(data);
        that.setData({
          markers: markersData,
          latitude: data.markers[0].latitude, 
          longitude: data.markers[0].longitude,
          poisData:data.poisData
        });
        that.showMarkerInfo(markersData, 0);
        that.changeMarkerColor(markersData, 0);
        console.log(that.data.poisData)
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: that.data.poisData[i].name,
        desc: that.data.poisData[i].address,
        tel: that.data.poisData[i].tel,
        rating: that.data.poisData[i].biz_ext.rating,
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png";
      } else {
        data[j].iconPath = "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"; 
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }
})