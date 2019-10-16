App({
    onLaunch:function(){
        
    },
    globalData:{
        API:{
            // 登录
            loginRequestUrlByMobile: 'https://juejin.im/auth/type/phoneNumber',
            loginRequestUrlByEMail: 'https://juejin.im/auth/type/email',
            // 小册
            xiaoceRequestUrl: 'https://xiaoce-timeline-api-ms.juejin.im/v1',
            // 沸点
            shortMsgMsRequestUrl: 'https://short-msg-ms.juejin.im/v1',
            dongtaiListRequestUrl: 'https://web-api.juejin.im/query',
            // 我
            apiRequestUrl: 'https://user-storage-api-ms.juejin.im/v1',
            notifyRequestUrl: 'https://ufp-api-ms.juejin.im/v1'
        }
    }
})