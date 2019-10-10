export class HTTP{
    request(params){
        let {url, method="GET", data={}} = params
        return new Promise((resolve,reject) => {
            this._request(url, method, data, resolve, reject)
        })
    }

    _request(url, method, data, resolve, reject){
        wx.request({
            url,
            method,
            data,
            header:{
                'content-type':'application/json',
            },
            success:(res)=> {
                const code = res.statusCode.toString()
                if (code.startsWith('2')){
                    resolve(res.data)
                }else{
                    reject()
                    this._show_error()
                }
            },
            fail: () => {
                reject()
                this._show_error()
            }
        })
    }

    _show_error(){
        wx.showToast({
            title: "网络错误", 
            icon:'none',
            duration:2000
        }) 
    }
}