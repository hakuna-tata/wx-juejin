import { XiaoCeModel } from '../../models/XiaoCeModel.js'

const XiaoCeClass = new XiaoCeModel()

Page({
    data: {
        auth:null,
        xiaoceList:[],
        pageNum: 1,
    },
    onShow: function () {
        this.setData({
            auth: wx.getStorageSync('auth')
        })
        this.getXiaoceList()
    },
    onReachBottom() {
      console.log('bottom')
    },
    getXiaoceList(){
        let auth = this.data.auth
        XiaoCeClass.getXiaoceList({
            src: 'web',
            uid: auth.uid || "",
            device_id: auth.clientId,
            token: auth.token,
            pageNum: this.data.pageNum,
        }).then(res => {
          this.setData({
            xiaoceList:res.d
          })
        })
    }
})