import { HTTP } from '../utils/http.js'

const config = getApp().globalData.API

export class FeiDianModel extends HTTP{
    getHotRecommendList(data){
        return this.request({
            url: `${config.shortMsgMsRequestUrl}/getHotRecommendList`,
            data
        })
    }
}