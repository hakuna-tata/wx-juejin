import { SearchModel } from '../../models/SearchModel.js'

const SearchClass = new SearchModel()

Page({

    data: {
        hotSrc:"images/pin_hot.png",
        rankList:[],
        scrollTop: 0,
        locked: false,
        hasMore:true
    },

    onShow () {
        this.setData({
            auth: wx.getStorageSync('auth'),
        })
        if(!this.data.scrollTop){
            wx.showLoading({
                title: '数据加载中'
            })
            this._getEntryByRank()
        }
    },

    onReachBottom: function () {
        this._getEntryByRank()
    },

    onPageScroll(e) {
        this.setData({
            scrollTop: e.scrollTop,
        })
    },

    _getEntryByRank(){
        let auth = this.data.auth
        if (this.data.locked) {
            return
        }

        let rankList = this.data.rankList
        if(!this.data.rankList.length){
            rankList = [{ rankIndex: "" }]
        }
        let rankIndex = (rankList.slice(-1)[0].rankIndex) || ""

        if(this.data.hasMore){
            this.setData({
                locked: true
            })
            SearchClass.getEntryByRank({
                uid: auth.uid,
                device_id: auth.client_id,
                token: auth.token,
                rankIndex
            }).then(res => {
                if (res.s !== 1){
                    wx.showToast({
                        title: res.m.toString(),
                        icon: "none",
                        duration: 2000
                    })
                    this.setData({
                        hasMore:false
                    })
                }
                this.setData({
                    rankList: this.data.rankList.concat(res.d.entrylist),
                    locked: false
                })
                wx.hideLoading()
            }).catch(() => {
                this.setData({
                    locked: false
                })
                wx.hideLoading()
            })
        } 
    }
})