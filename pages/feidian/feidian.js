import { FeiDianModel } from '../../models/FeiDianModel.js'

const FeiDianClass = new FeiDianModel()

Page({
    data: {
        after:"",
        scrollTop: 0,
        locked: false,
        recommendList:[],
        swiperHeight:"auto",
        postList:[]
    },

    onLoad: function (options) {
        this.setData({
            auth: wx.getStorageSync('auth'),
        })
        this._initSwiper()
        this._getHotRecommendList()
        this._getDongTaiList(this.data.after)
    },

    onShow: function () {
        if (!this.data.scrollTop && this.data.after) {
            wx.startPullDownRefresh({})
        }
    },

    onPullDownRefresh: function () {
        this.setData({
            after: "",
            postList: []
        })
        this._initSwiper()
        this._getDongTaiList(this.data.after)
    },

    onReachBottom: function () {
        this._getDongTaiList(this.data.after)
    },

    onPageScroll(e) {
        this.setData({
            scrollTop: e.scrollTop,
        })
    },

    onShareAppMessage(res){
        let obj = {}
        if(res.from === 'button'){
            let _node = res.target.dataset.item.node
            obj.title = `来自 ${_node.actors[0].username} 的沸点: ${_node.targets[0].content}`
            obj.path = `/pages/feidianDetail/feidianDetail?msgId=${_node.actors[0].id}`
        }
        return obj
    },

    _initSwiper() {
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    swiperHeight: `${(res.windowWidth || res.screenWidth) / 375 * 135}px`
                })
            },
        })
    },
    
    _getHotRecommendList(){
        let auth = this.data.auth
        FeiDianClass.getHotRecommendList({
            uid: auth.uid,
            device_id: auth.clientId,
            client_id: auth.client_id,
            token: auth.token,
            src: 'web',
        }).then(res => {
            this.setData({
                recommendList: (res.d && res.d.list) || [],
            })
        })
    },

    _getDongTaiList(after){
        if(this.data.locked){
            return
        }
        this.setData({
            locked: true
        })
        FeiDianClass.getDongTaiList(after).then(res => {
            let items = res.data.recommendedActivityFeed.items
            this.setData({
                locked: false,
                after: (items.pageInfo && items.pageInfo.endCursor) || "",
                postList: this.data.postList.concat(items.edges)
            })
            wx.stopPullDownRefresh()
        }).catch(() => {
            this.setData({
                locked: false
            })
            wx.stopPullDownRefresh()
        })
    },

    toDetail(e){
        wx.navigateTo({
            url: `/pages/feidianDetail/feidianDetail?msgId=${e.detail.id}`,
        })
    }
})