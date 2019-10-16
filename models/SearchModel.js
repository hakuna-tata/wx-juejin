import { HTTP } from '../utils/http.js'

const config = getApp().globalData.API

export class SearchModel extends HTTP{
    getEntryByRank(params){
        return this.request({
            url: `${config.timelineRequestUrl}/get_entry_by_rank`,
            data:{
                src: 'web',
                uid: params.uid || 'unlogin',
                device_id: params.device_id,
                token: params.token || '',
                limit: 20,
                before: params.rankIndex,
            }
        })
    }
}