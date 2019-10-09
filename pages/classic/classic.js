import { isLogin } from '../../utils/utils.js'
Page({
    onLoad: function (options) {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this.turn()
        },1500)
    },
    turn(){
        let auth = isLogin()
        let url = auth ? "/pages/home/home" : "/pages/feidian/feidian"
        wx.switchTab({
            url
        })
    }
})