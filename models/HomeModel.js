import { HTTP } from "../utils/http.js"

const config = getApp().globalData.API

export class HomeModel extends HTTP {
    getEntryByTimeline(params){
        return this.request({
            url: `${config.timelineRequestUrl}/get_entry_by_timeline`,
            data: {
                src: "web",
                uid: params.uid || "",
                device_id: params.device_id,
                token: params.token,
                limit: 20,
                category: "all",
                recomment: 1,
                before: params.rankIndex,
            }
        })
    }

    getEntryByHotRecomment(params) {
        return this.request({
            url: `${config.timelineRequestUrl}/get_entry_by_hot_recomment`,
            data: {
                src: "web",
                uid: params.uid || "",
                device_id: params.device_id || "",
                client_id: params.clientId || "",
                token: params.token || "",
                limit: 20,
            }
        })
    }

    userFilterEntry(params){
        return this.request({
            url: `${config.timelineRequestUrl}/user_filter_entry`,
            data: {
                src: "web",
                uid: params.uid,
                device_id: params.device_id,
                client_id: params.clientId,
                token: params.token,
                entryId: params.entryId
            }
        })
    }
}