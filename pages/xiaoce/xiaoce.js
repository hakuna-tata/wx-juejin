import { XiaoCeModel } from '../../models/XiaoCeModel.js'

const XiaoCeClass = new XiaoCeModel()

Page({
    data: {
        locked:false,
        hasMore:true,
        loading: false,
    },
    onLoad: function () {
        this.setData({
            auth: wx.getStorageSync('auth'),
            xiaoceList: [],
            pageNum:1
        })
        this._getXiaoceList()
    },
    onReachBottom() {
        this._getXiaoceList()
    },
    _getXiaoceList(){
        if (this.data.locked){
            return
        }
        if(this.data.hasMore){
            this.setData({
                locked: true,
                loading: true
            })
            XiaoCeClass.getXiaoceList({
                src: 'web',
                uid: this.data.auth.uid || "",
                device_id: this.data.auth.clientId,
                token: this.data.auth.token,
                pageNum: this.data.pageNum,
            }).then(res => {
                if (res.s === 2){
                    this.setData({
                        hasMore: false,
                        loading: false
                    })
                }
                this.setData({
                    xiaoceList: this.data.xiaoceList.concat(res.d),
                    pageNum: this.data.pageNum + 1,
                    locked: false,
                    loading: false
                })
            }).catch(() => {
                // 防死锁
                this.setData({
                    locked: false
                })
            })
        }   
    },
    toDetail(e){
        wx.navigateTo({
            url: `/pages/xiaocedetail/xiaocedetail?id=${e.detail.id}`,
        })
    }
})