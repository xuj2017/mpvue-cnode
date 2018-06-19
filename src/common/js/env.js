let baseUrl = process.env.NODE_ENV === 'development' 
    ? 'https://cnodejs.org/api/v1/'
    : 'https://cnodejs.org/api/v1/';

export {
    baseUrl
}