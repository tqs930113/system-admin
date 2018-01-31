export default {
  set: function (name, value, expires, path, domain, secure) {
    // 存入cookie数据
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (expires instanceof Date) {
      cookieText += ';expires=' + expires.toGMTString()
    }
    if (path) {
      cookieText += ';path=' + path
    }
    if (domain) {
      cookieText += ';domain=' + domain
    }
    if (secure) {
      cookieText += ';secure'
    }
    document.cookie = cookieText
    console.log(cookieText + '----------cookie : ' + document.cookie)
  },
  get: function (name) {
    // 取出cookie数据
    var cookieName = encodeURIComponent(name) + '='
    var cookieStart = document.cookie.indexOf(cookieName)
    var cookieValue = null
    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }
    return cookieValue
  },
  delete: function (name, path, domain, secure) {
    // 删除cookie数据，既是修改expires时间设置cookie过期
    this.set(name, '', new Date(0), domain, path, secure)
  },
  setCookieDate: function (day) {
    // 设置cookie有效时间
    var date = null
    if (typeof day === 'number' && day > 0) {
      date = new Date()
      console.log(date)
      date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000)
    } else {
      throw new Error('设置cookie有效时间不为数字或小于等于0!!')
    }
    return date
  }
}
