const regeneratorRuntime = require('../libs/regenerator-runtime/runtime.js')
const request = require('./request.js')
const tool = require('./tool.js')

class Wechat {
  // signin
  async signin(res) {
    const openID = await this.getSession()
    const account = await this.getUser(openID, res)
    return account
  }

  // phone
  async phone(body) {
    const openID = await this.getSession()
    body.open_id = openID
    const phone = await this.getPhone(body)
    return phone
  }

  // getSession
  async getSession() {
    const res = await this.wxLogin()
    if (!res.code) {
      return
    }
    const data = {
      url: '/v4/account/signin/session',
      method: 'POST',
      login: false,
      body: {
        code: res.code,
        channel: getApp().globalData.channel,
      },
    }
    const result = await request.handle(data)
    if (!result) {
      return
    }
    return result
  }

  // getUser
  async getUser(openID, res) {
    if (!res) {
      res = await this.wxSetting()
      if (!res.authSetting['scope.userInfo']) {
        tool.navigateTo('/pages/account/wechat/wechat')
        return
      }
      res = await this.wxInfo()
      if (!res.encryptedData) {
        tool.navigateTo('/pages/account/wechat/wechat')
        return
      }
    }
    const data = {
      url: '/v4/account/signin/mp',
      method: 'POST',
      login: false,
      body: {
        iv: res.iv,
        encrypted_data: res.encryptedData,
        open_id: openID,
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
  getPhone(body) {
    const data = {
      url: '/v4/account/signin/pn',
      method: 'POST',
      login: false,
      body: body
    }
    const result = request.handle(data)
    if (!result) {
      return
    }
    return result
  }

  // wxLogin
  wxLogin() {
    return new Promise(function(resolve, reject) {
      wx.login({
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // wxInfo
  wxInfo() {
    return new Promise(function(resolve, reject) {
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // wxSetting
  wxSetting() {
    return new Promise(function(resolve, reject) {
      wx.getSetting({
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }
}

const wechat = new Wechat()
module.exports = wechat