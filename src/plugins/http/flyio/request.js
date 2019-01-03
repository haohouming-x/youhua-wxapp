import Flyio from './interceptors'
import API from '../apiUrl'
import Config from './config'
// 异常情况的错误处理
const errorFunction = (_tipConfig, err) => {
  clearFunction(_tipConfig)
  // 如果有异常需要提示
  if (!_tipConfig.errorAction && _tipConfig.isErrorDefaultTip) {
    Config.resError.tipShow(err)
  }
  throw (err)
}

let promises = [] // 接收接口请求的promise数组
let loadingTimer = null // loading的定时器

const clearFunction = (_tipConfig) => {
  promises = [] // 所有请求完后清除promise数组
  wx.hideLoading() // 请求完成则隐藏loading
  clearTimeout(loadingTimer) // 当请求在xxxms内完成则直接清除loading计时器
}

// 接口请求封装函数
const handleRequest = (url = '', {data = {}, ...flyConfig}, tipConfig = {}) => {
  const [enumName, params] = url.split('@');

  let _url = API[enumName] || '';

  if(_url === '') throw Error(`枚举'${enumName}'没有定义`);

  _url = params ? _url.replace(/\{([^{}]+)\}/g, (_, key) => {
    const match = params.match(`[( ?)\\{|( ?)\\,](${key}( ?):\\s*)(.*?)([( ?)\\,|( ?)\\}])`)

    if(!match) throw Error(`${_url}参数解析缺少{${key}}的值`);

    return match[3]
  }) : _url;

  _url = Config.host + _url;

  let flyio = Flyio.request(_url, data, {...Config.flyConfig, ...flyConfig})

  let _tipConfig = {...Config.reqConfig, ...tipConfig}
  // 开启loading
  clearTimeout(loadingTimer) // 多个接口时需要清除上一个loading
  loadingTimer = setTimeout(() => {
    _tipConfig.isLoading && wx.showLoading({
      title: '加载中',
      mask: true
    })
  }, Config.loading.limitTime)

  // 计算当前的promise是否全部加载完成
  promises.push(flyio)
  Flyio.all(promises).then(data => {
    if (data.length !== promises.length) return
    clearFunction(_tipConfig)
  }).catch(() => {
    clearFunction(_tipConfig)
  })
  // 返回请求
  return flyio.then((res) => {
    return res
  }).catch(err => {
    errorFunction(_tipConfig, err)
  })
}

export default handleRequest
