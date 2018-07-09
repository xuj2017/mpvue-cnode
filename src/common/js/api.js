import  {request} from './request';

//获取用户信息
export const getUser =  loginname => request(`user/${loginname}`)

//获取用户收藏的主题
export const getStar = loginname => request(`topic_collect/${loginname}`)