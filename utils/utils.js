export const isLogin = () => {
    let auth = wx.getStorageInfoSync('auth') || {}
    if (auth.token && auth.uid) {
        return auth
    }
    return false
}