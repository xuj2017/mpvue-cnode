import {baseUrl} from './env';

export  async function request(url = '', data = {}, method = 'GET',loading = true){
    method = method.toUpperCase();
    url = baseUrl + url;
    return new Promise( (resolve,reject)=>{
        if(!!loading){
            wx.showNavigationBarLoading();//设置导航条加载动画
            wx.showLoading({
                mask:true,
                title:'加载中'
            })
        }
        wx.request({
            url:url,
            method:method,
            data:data,
            header:{
                'content-type':'application/json',
                'Accept':'application/json'
            },
            dataType:'json',
            success(json){
                if(!!loading){
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                }

                resolve(json.data.data)
            },
            fail(e){
                reject(e);
            }
        })
    })
}