import _ from 'lodash';

/**
 * 时间格式化
 * @param {string} format 
 */
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

export const navList = [
    {title:'全部',type:'all'},
    {title:'精华',type:'good'},
    {title:'分享',type:'share'},
    {title:'问答',type:'ask'},
    {title:'招聘',type:'job'},
    {title:'测试',type:'dev'}
]

/**
 *获取文章列表标签状态
 * @export
 * @param {string} [type='ask']
 * @returns
 */
export function getTopicType( type = 'ask'){
    let listMap = _.keyBy(navList,'type');
    return listMap[type].title
}

/**
 *获取时间差
 * @export
 * @param {string} str
 * @returns
 */
export function getTimeInfo(str){
    if (!str) {
        return ''
    }
    const date = new Date(str);
    const time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
}

/**
 *格式化时间
 * @export
 * @param {*} str
 * @returns
 */
export function formatTime(str){
    str = new Date(str);
    return str.format('yyyy-MM-dd hh:mm:ss')
}