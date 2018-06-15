import {baseUrl} from './env';

export default async(url = '', data = {}, type = 'GET')=>{
    type = type.toUpperCase();
    url = baseUrl + url;
}