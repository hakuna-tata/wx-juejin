import { HTTP } from '../utils/http.js'

const config = getApp().globalData.API

export class FeiDianModel extends HTTP{
    getHotRecommendList(data){
        return this.request({
            url: `${config.shortMsgMsRequestUrl}/getHotRecommendList`,
            data
        })
    }

    getDongTaiList(after){
        return this.request({
            url: config.dongtaiListRequestUrl,
            method: "POST",
            header: {
                "X-Agent": "Juejin/Web",
            },
            data:{
                operationName: "",
                query: "",
                variables: {
                    size: 20,
                    after
                },
                extensions: {
                    query: {
                        id: "964dab26a3f9997283d173b865509890"
                    }
                }
            }
        })
    }
}