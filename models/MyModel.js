import { HTTP } from '../utils/http.js'

const config = getApp().globalData.API

export class MyModel extends HTTP{
    getUserInfo(data){
        return this.request({
            url: `${config.apiRequestUrl}/getUserInfo`,
            data
        })
    }
    userNotificationNum(data) {
        return this.request({
            url: `${config.notifyRequestUrl}/getUserNotificationNum`,
            data
        })
    }
}