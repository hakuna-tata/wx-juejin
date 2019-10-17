import { HomeModel } from '../../models/HomeModel.js'
import { isLogin } from '../../utils/utils.js'

const HomeClass = new HomeModel()

Page({

    data: {
        hotRecSrc: "images/ic_hot_home.png",
        refreshSrc: "images/refresh_icon.png",
        closeSrc: "images/chart_close.png",
        locked: false,
        hasMore: true,
        Login:false,
        scrollTop: 0,
        timeline: [],
        hotRecomment: [],
        hotRecommendShow: true,
    },

    onShow: function (options) {
        this.setData({
            auth: wx.getStorageSync('auth'),
        })
        if(isLogin()){
            this.setData({
                Login: true,
            })
        }
        if (!this.data.scrollTop) {
            wx.startPullDownRefresh({})
        }
    },


    onPullDownRefresh: function () {
        if(this.data.auth){
            this._getEntryByHotRecomment()
        }
        this._getEntryByTimeline()
    },

    onReachBottom: function () {
        this._getEntryByTimeline()
    },

    onPageScroll(e) {
        this.setData({
            scrollTop: e.scrollTop,
        })
    },
    
    _getEntryByTimeline(){
        let auth = this.data.auth
        if (this.data.locked) {
            return
        }

        let timeline = this.data.timeline
        if (!this.data.timeline.length) {
            timeline = [{ verifyCreatedAt: "" }]
        }
        let rankIndex = (timeline.slice(-1)[0].verifyCreatedAt) || ""

        if (this.data.hasMore) {
            this.setData({
                locked: true
            })
            HomeClass.getEntryByTimeline({
                uid: auth.uid,
                device_id: auth.client_id,
                token: auth.token,
                rankIndex
            }).then(res => {
                if (res.s !== 1) {
                    wx.showToast({
                        title: res.m.toString(),
                        icon: "none",
                        duration: 2000
                    })
                    this.setData({
                        hasMore: false
                    })
                }
                this.setData({
                    timeline: this.data.timeline.concat(res.d.entrylist),
                    locked: false
                })
                wx.stopPullDownRefresh()
            }).catch(() => {
                this.setData({
                    locked: false
                })
                wx.stopPullDownRefresh()
            })
        } 
    },

    _getEntryByHotRecomment(){
        let auth = this.data.auth
        HomeClass.getEntryByHotRecomment({
            uid: auth.uid,
            device_id: auth.clientId,
            client_id: auth.clientId,
            token: auth.token,
        }).then(res => {
            if(res.s === 1){
                this.setData({
                    hotRecommendShow: res.d.entry.entrylist.length ? true : false,
                    hotRecomment: res.d.entry.entrylist.slice(0, 3),
                })
            }
        })
    },

    refreshHot(){

    },

    closeHot() {
        this.setData({
            hotRecommendShow: false,
        })
    },
})