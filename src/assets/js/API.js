import axios from 'axios'
import config from './config'
import Qs from 'qs'
import cookieUntil from './cookieUntil'

// axios(config);
class API {
  get (param) {
    return axios.get(param.url, config)
  }
  post (param) {
    return axios.post(param.url, Qs.stringify(param.datas), config)
  }
  put (param) {
    return axios.put(param.url, Qs.stringify(param.datas), config)
  }
  delete (param) {
    return axios.delete(param.url, config)
  }
  validateResSuccess (res) {
    if (res.data.code === '000000') {
      return true
    }
    return false
  }
  reqSuccess (obj, msg) {
    // 请求成功的提示框
    obj.$message({
      message: msg,
      type: 'success'
    })
  }
  reqFail (obj, msg) {
    // 请求失败的提示框
    obj.$message({
      message: msg,
      type: 'error'
    })
  }
  formatDate (nows, operation, isChinese) {
    // 格式化时间格式
    var now = new Date(nows)
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    month = month.toString().length <= 1 ? ('0' + month.toString()) : month
    var date = now.getDate()
    date = date.toString().length <= 1 ? ('0' + date.toString()) : date
    var hour = now.getHours()
    hour = hour.toString().length <= 1 ? ('0' + hour.toString()) : hour
    var minute = now.getMinutes().length <= 1 ? '0' + now.getMinutes() : now.getMinutes()
    minute = minute.toString().length <= 1 ? ('0' + minute.toString()) : minute
    var second = now.getSeconds().length <= 1 ? '0' + now.getSeconds() : now.getSeconds()
    second = second.toString().length <= 1 ? ('0' + second.toString()) : second
    if (isChinese) {
      return year + '年' + month + '月' + date + '日 ' + hour + '时' + minute + '分' + second + '秒'
    }
    return year + operation + month + operation + date + ' ' + hour + ':' + minute + ':' + second
  }
  checkToken (tokenSymbol, that, expires) {
    // 检查路由中是否有传入token，如有则存入cookie
    var paramsObj = that.$route.query
    if (paramsObj[tokenSymbol] === undefined) {
      return
    }
    cookieUntil.set(tokenSymbol, paramsObj[tokenSymbol], cookieUntil.setCookieDate(expires))
  }
  getToken (tokenSymbol) {
    // 从cookie中获取token
    return cookieUntil.get(tokenSymbol)
  }
}
export default API
