const regeneratorRuntime = require('../libs/regenerator-runtime/runtime.js')
const alipay = require('./alipay.js')
const tool = require('./tool.js')
const value = require('./value.js')
const wechat = require('./wechat.js')

class Account {
  // check
  check() {
    const now = new Date().getTime();
    let account = getApp().globalData.account
    let expire = getApp().globalData.expire
    if (account !== undefined && expire - now > 0) {
      return account
    }
    account = value.get('account')
    expire = value.get('expire')
    if (account != undefined && expire - now > 0) {
      getApp().globalData.name = account.name
      getApp().globalData.account = account
      getApp().globalData.expire = expire
      return account
    }
    return
  }

  // get
  async get(res) {
    let account = this.check()
    if (!account) {
      if (getApp().globalData.channel.indexOf('wx') > -1) {
        account = await wechat.signin(res)
      } else {
        account = await alipay.signin(res)
      }
      if (account) {
        this.set(account)
      }
    }
    return account
  }

  // set
  set(data) {
    const now = new Date().getTime()
    const expire = now + 7 * 24 * 3600 * 1000
    getApp().globalData.name = data.name
    getApp().globalData.account = data
    getApp().globalData.expire = expire
    value.set('account', data)
    value.set('expire', expire)
    return
  }

  // del
  del(key) {
    value.del('expire')
    return value.del('account')
  }
}

const account = new Account()
module.exports = account