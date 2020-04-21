const regeneratorRuntime = require('../libs/regenerator-runtime/runtime.js')
const request = require('./request.js')
const tool = require('./tool.js')

class Alipay {
  // signin
  async signin(res) {
    if (!res) {
      tool.navigateTo("/pages/account/alipay/alipay");
      return
    }
    const info = await this.getInfo()
    const account = await this.getUser(info)
    return account
  }

  // phone
  async phone(res) {
    const phone = await this.getPhone()
    return phone
  }

  // getInfo
  async getInfo() {
    const res = await this.myInfo()
    return JSON.parse(res.response)
  }

  // getUser
  async getUser(info) {
    const res = await this.myLogin()
    if (!res.authCode) {
      return
    }
    const data = {
      url: '/v4/account/signin/mi',
      method: 'POST',
      login: false,
      body: {
        code: res.authCode,
        content: JSON.stringify(info.response),
        channel: getApp().globalData.channel,
      }
    }
    const result = await request.handle(data)
    if (!result) {
      return
    }
    return result
  }

  // getPhone
  getPhone() {
    const res = this.myPhone()
    if (!res.response) {
      return
    }
    const data = {
      url: '/v4/account/signin/mn',
      method: 'POST',
      login: false,
      body: {
        content: res.response
      }
    }
    const result = request.handle(data)
    if (!result) {
      return
    }
    return result
  }

  // wxLogin
  myLogin() {
    return new Promise(function (resolve, reject) {
      my.getAuthCode({
        scopes: 'auth_user',
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  }

  // myInfo
  myInfo() {
    return new Promise(function (resolve, reject) {
      my.getOpenUserInfo({
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  }

  // myPhone
  myPhone() {
    return new Promise(function (resolve, reject) {
      my.getPhoneNumber({
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  }
}

const alipay = new Alipay()
module.exports = alipay