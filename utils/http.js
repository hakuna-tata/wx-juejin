
const tips = {
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
}

export class HTTP{
    request(params){
        let {url, method="GET", data={}, header} = params
        return new Promise((resolve,reject) => {
            this._request(url, method, data, header, resolve, reject)
        })
    }

    _request(url, method, data, header, resolve, reject){
        wx.request({
            url,
            method,
            data,
            header:{
                'content-type':'application/json',
                ...header
            },
            success:(res)=> {
                const code = res.statusCode.toString()
                if (code.startsWith('2')){
                    resolve(res.data)
                }else{
                    reject()
                    this._show_error(code)
                }
            },
            fail: (err) => {
                reject()
                this._show_error(err.errMsg)
            }
        })
    }

    _show_error(error){
        wx.showToast({
            title: tips[error] || "网络开小差,请稍后再试", 
            icon:'none',
            duration:2000
        }) 
    }
}