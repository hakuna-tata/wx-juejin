import { HTTP } from '../utils/http.js'

const config = getApp().globalData.API

export class LoginModel extends HTTP {
    submit(params){
        return this.request({
            url: params.type === 1 ? config.loginRequestUrlByMobile : config.loginRequestUrlByEMail,
            method:"POST",
            data:params.data
        })
    }
}