import { HTTP } from '../utils/http.js'

const config = getApp().globalData.API

export class XiaoCeModel extends HTTP {
    getXiaoceList(data){
        return this.request({
            url: `${config.xiaoceRequestUrl}/getListByLastTime`,
            data
        })
    }
}