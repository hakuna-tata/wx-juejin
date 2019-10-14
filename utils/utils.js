export const isLogin = () => {
   return wx.getStorageSync('auth') ? true : false
}

export const toDetail = (dataset) => {
    let { url }  =  dataset
    if(dataset.open){
        wx.navigateTo({
            url,
        })
    }else{
        if(isLogin()){
            wx.navigateTo({
                url,
            })
        }else{
            wx.navigateTo({
                url: '/pages/login/login'
            })
        }
    }
}