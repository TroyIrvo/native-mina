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
		refreshSize: 150,
		bottomSize: 200,
		color: "#3F82FD",
  },
  itemClick(e) {
    console.log(e);
  },

  enableBackToTopChange(e) {
    this.setData({
      enableBackToTop: e.detail.value
    })
  },
  refreshChange(e) {
    this.setData({
      refreshSize: e.detail.value
    })
  },
  bottomChange(e) {
    this.setData({
      bottomSize: e.detail.value
    })
  },

  emptyChange(e) {
    if (e.detail.value) {
      this.setData({
        dataList: [],
        emptyShow: true,
        end: true
      })
    } else {
      this.setData({
        dataList: testData,
        emptyShow: false,
        end: false
      })
    }
  },
  getList(type, currentPage) {
    this.setData({
      requesting: true
    })

    wx.showNavigationBarLoading()

    let params = {
      "UserId": "3d376010-f67a-4683-9919-1ab929b7c323"
    };
    Api.getIndexListData("003300900001", params).then(data => {
      let testData = data.body.items;
      this.setData({
        requesting: false
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
      wx.hideNavigationBarLoading()
    }).catch(err => {
      console.log(err);
    })
    // 模拟异步获取数据场景
    setTimeout(() => {



    }, 1000);
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