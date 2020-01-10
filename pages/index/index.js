//index.js
const Api = require('../../api/interface.js')
//获取应用实例
const app = getApp()
let pageStart = 0;
Page({
  data: {
    requesting: false,
		end: true,
		emptyShow: false,
		page: pageStart,
		listData: [],
		hasTop: true,
    enableBackToTop: true,
    customBar:app.globalData.CustomBar,
		refreshSize: app.globalData.CustomBar * 1.5,
		bottomSize: app.globalData.CustomBar+15,
    color: "#3F82FD",
    isReqSucc:true
  },
  itemClick(e) {
    console.log(e);
  },

  
  getList(type, currentPage) {
    this.setData({
      requesting: true
    })

    let params = {
      "UserId": "3d376010-f67a-4683-9919-1ab929b7c323"
    };
    Api.getIndexListData("003300900001", params).then(data => {
      let testData = data.body.items;
      this.setData({
        requesting: false,
        isReqSucc:true
      })
      if (type === 'refresh') {
        this.setData({
          dataList: testData,
          page: currentPage + 1
        })
      } else {
        this.setData({
          dataList: this.data.dataList.concat(testData),
          page: currentPage + 1,
          end: false
        })
      }
    }).catch(err => {
      this.setData({
        requesting: false,
        isReqSucc:false
      })
      console.log(err);
    })

  },
  // 刷新数据
  refresh() {
    this.getList('refresh', pageStart);
    this.setData({
      empty: false
    })
  },
  // 加载更多
  more() {
    this.getList('more', this.data.page);
  },
  onLoad() {
    this.getList('refresh', pageStart);
  },

});