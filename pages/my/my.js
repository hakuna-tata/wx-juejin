import { MyModel } from '../../models/MyModel.js'
import { toDetail }  from '../../utils/utils.js'

const MyClass = new MyModel()

Page({
    data: {
        auth: null,
        userInfo: {},
        cardData:[
            {
                image:"/pages/my/images/ic_notification.png",
                title:"消息中心",
                url:"/pages/infoCenter/infoCenter"
            },
            {
                image: "/pages/my/images/ic_heart_entry_bottom_full.png",
                title: "我喜欢的",
                count: "0篇",
                url:"/pages/favorate/favorate"
            },
            {
                image: "/pages/my/images/ic_collection_set.png",
                title: "收藏集",
                count: "0个",
                url:"/pages/collectionSet/collectionSet"
            },
            {
                image: "/pages/my/images/user_buy.png",
                title: "已购小册",
                count: "0本",
                url: "/pages/purchasedXiaoce/purchasedXiaoce"
            },
            {
                image: "/pages/my/images/user_liked_pin.png",
                title: "赞过的沸点",
                count: "0个",
                url: "/pages/myPins/myPins?liked=1"
            },
            {
                image: "/pages/my/images/view.png",
                title: "阅读过的文章",
                count: "0篇",
                url:"/pages/readHistory/readHistory"
            },
            {
                image: "/pages/my/images/tag.png",
                title: "标签管理",
                count: "0个",
                url: "/pages/manageTag/manageTag"
            },
            {
                image: "/pages/my/images/icon_feed_back.png",
                title: "意见反馈",
                url: "/pages/feedback/feedback",
                open: true
            },
            {
                image: "/pages/my/images/settings.png",
                title: "设置",
                url: "/pages/setting/setting",
                open: true
            },
            {
                image: "/pages/my/images/qrcode.png",
                title: "小程序码",
                url: "/pages/miniqrcode/miniqrcode",
                open: true
            }
        ]
    },
    onShow: function (options) {
        this.setData({
            auth:wx.getStorageSync('auth')
        })
        if (this.data.auth) {
            this.getUserInfo()
            this.userNotificationNum()
        } else {
            this.setData({
                userInfo: {},
            })
        }
    },

    getUserInfo() {
        let auth = this.data.auth
        MyClass.getUserInfo({
            src: 'web',
            device_id: auth.clientId,
            uid: auth.uid,
            token: auth.token,
            current_uid: auth.uid,
        }).then(res => {
            let [item1,item2,item3,item4,item5,item6] = [
                Object.assign(this.data.cardData[1], { count: `${res.d.collectedEntriesCount || 0}篇`}),
                Object.assign(this.data.cardData[2], { count: `${res.d.collectionSetCount || 0}个`}),
                Object.assign(this.data.cardData[3], { count: `${res.d.purchasedBookletCount || 0}本`}),
                Object.assign(this.data.cardData[4], { count: `${res.d.likedPinCount || 0}个`}),
                Object.assign(this.data.cardData[5], { count: `${res.d.viewedEntriesCount || 0}篇`}),
                Object.assign(this.data.cardData[6], { count: `${res.d.subscribedTagsCount || 0}个`}),
            ]
            this.data.cardData.splice(1, 6, item1, item2, item3, item4, item5, item6)
            this.setData({
                userInfo: res.d,
                cardData: this.data.cardData
            })
        })
    },

    userNotificationNum() {
        let auth = this.data.auth
        MyClass.userNotificationNum({
            src: 'web',
            uid: auth.uid,
            token: auth.token,
        }).then(res => {
            let count = res.d.notification_num === 0 ? "" : res.d.notification_num
            let firstIndex = Object.assign(this.data.cardData[0], { count })
            this.data.cardData.splice(0, 1, firstIndex)
            this.setData({
                cardData: this.data.cardData
            })
        })
    },

    toDetail(e){
        toDetail(e.detail)
    }
})