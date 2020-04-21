const regeneratorRuntime = require('../libs/regenerator-runtime/runtime.js')
const tool = require('./tool.js')

class Request {
  // handle
  async handle(data) {
    try {
      const response = await this.wxRequest(data)
      if (response.code !== undefined) {
        tool.showModal(response.error)
      }
      return response.result
    } catch (e) {
      console.log(e)
    }
  }

  // wxRequest
  wxRequest(data) {
    data.url = this.setURL(data.url)
    data.header = this.setHeader(data.login)
    if (data.body !== undefined) {
      data.body = this.setBody(data.body)
    }
    console.log(`[ req ] --> ${data.url} --> `, data.body || '');
    return new Promise(function(resolve, reject) {
      wx.request({
        url: data.url,
        method: data.method,
        header: data.header,
        data: data.body,
        success: function(res) {
          resolve(res.data)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // setURL
  setURL(data) {
    let _regURL = /^https?:\/\//i;
    const app = getApp().globalData;
    let host = _regURL.test(data) ? '' : app.host;
    if (app.env !== 'pro') {
      host = 'http://localhost:8888'
    }
    return host + data
  }

  // setHeader
  setHeader(data) {
    let header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (data !== true) {
      return header
    }
    header.Authorization = 'Bearer ' + getApp().globalData.account.token
    return header
  }

  // setBody
  setBody(data) {
    return JSON.stringify(data)
  }
}

const request = new Request()
module.exports = request