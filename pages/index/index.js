//index.js
const Api = require('../../api/interface.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    dataList: [],
    CustomBar: ""
  },

  onLoad: function () {
    wx.startPullDownRefresh();
  },

  onPullDownRefresh: function () {
    let params = {
      "UserId": "3d376010-f67a-4683-9919-1ab929b7c323"
    };
    Api.getIndexListData("003300900001", params).then(data => {
      setTimeout(() => {
        wx.stopPullDownRefresh()
        this.setData({
          CustomBar: app.globalData.CustomBar,
          dataList: data.body.items
        })
      }, 1000)
    }).catch(err => {
      console.log(err);
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1000)
    })
  }

})