export const isLogin = () => {
   return wx.getStorageSync('auth') ? true : false
}