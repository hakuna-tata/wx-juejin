App({
    onLaunch:function(){
        
    },
    globalData:{
        API:{
            // 登录
            loginRequestUrlByMobile: 'https://juejin.im/auth/type/phoneNumber',
            loginRequestUrlByEMail: 'https://juejin.im/auth/type/email',
            // 沸点
            shortMsgMsRequestUrl: 'https://short-msg-ms.juejin.im/v1',
            // 我
            apiRequestUrl: 'https://user-storage-api-ms.juejin.im/v1',
            notifyRequestUrl: 'https://ufp-api-ms.juejin.im/v1'
        }
    }
})