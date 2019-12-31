//index.js
const Api = require('../../api/interface.js')
//获取应用实例
//const app = getApp()

Page({
  data: {
    dataList:[],
  },

  onLoad: function () {
    wx.startPullDownRefresh();
  },

  onPullDownRefresh:function () {
    let params = {
      "UserId": "75f4c652-0a6d-4885-bd7f-d2c5998ce551"
    };
    Api.getIndexListData("003300900001", params).then(data => {
      setTimeout(()=>{
        wx.stopPullDownRefresh()
        this.setData({dataList:data.body.items})
      },1000)
    }).catch(err => {
       console.log(err);
       setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    })
  }

})
