import { LoginModel } from '../../models/LoginModel.js'

const LoginClass = new LoginModel()

Page({
    login(e){
        wx.showLoading({
            title: '加载中...',
        })
        let {account, password} = e.detail.value
        if (!account.replace(/\s+/g, '')){
            wx.showToast({
                title: '请输入账号',
                icon: 'none',
            })
            return
        }
        if (!password.replace(/\s+/g, '')) {
            wx.showToast({
                title: '请输入登录密码',
                icon: 'none',
            })
            return
        }
        let type = account.indexOf('@') !== -1 ? 2 : 1
        // 目前只能邮箱登录
        let data = type === 1 ? {
            mobilePhoneNumber:account,
            password
        } : {
            email: account,
            password,
        }
        LoginClass.submit({
            type,
            data
        }).then(res => {
            wx.setStorage({
                key: 'auth',
                data: {
                    'token': res.token,
                    'uid': res.userId,
                    'clientId': res.clientId,
                },
            })
            wx.navigateBack({})
        }).catch(e => {
            //do nothing
        })
    }
})