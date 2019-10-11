import { HTTP } from '../utils/http.js'

const config = getApp().globalData.API

export class FeiDianModel extends HTTP{
    getHotRecommendList(){
        return this.request({
            url: config.shortMsgMsRequestUrl + '/getHotRecommendList',
            data:{
                // uid:"",
                // device_id:"",
                // client_id:"",
                // token:"",
                src:"web"
            } 
        })
    }
}