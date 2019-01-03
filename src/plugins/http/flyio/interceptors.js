import Fly from 'flyio'
const request = new Fly()

// FRAME: 此为http请求拦截

// 可在此修改全局请求头，例如：带上token等
request.interceptors.request.use((request) => {
  return request
})

// 根据接口要求
// 例：常见restful规范，是按http状态码来判断接口处理成不成功等
// htpp请求本身就区分了成功和失败2种情况
// 若接口不是按restful规范可自行修改 成功或失败的拦截（例子@a）
// 这样到外面使用请求时，then里就是成功的回调，catch就是失败的并且会执行错误信息预设提示（config.js）
request.interceptors.response.use(
  (response, promise) => {
    /* @a
     * if(response.data.errorCode === 200) return promise.resolve(response.data)
     * else return promise.reject(response.data)
     */
    return promise.resolve(response.data)
  },
  (err, promise) => {
    return promise.reject(err)
  }
)


export default request
