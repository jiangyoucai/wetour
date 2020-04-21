const regeneratorRuntime = require('../libs/regenerator-runtime/runtime.js')
const tool = require('./tool.js')

class Image {
  // upload
  async upload(data) {
    try {
      const path = await this.wxChoose()
      data.path = path
      const response = await this.wxUpload(data)
      if (response !== undefined) {
        return response
      }
      tool.showModal('image upload error')
    } catch (e) {
      console.log(e.errMsg)
    }
  }

  // download 
  async download(url) {
    try {
      const response = await this.wxDownload(url)
      if (response !== undefined) {
        return response
      }
      tool.showModal('image download error')
    } catch (e) {
      console.log(e.errMsg)
    }
  }

  // preview
  preview(current, urls) {
    return new Promise(function(resolve, reject) {
      wx.previewImage({
        current: current,
        urls: urls,
        success: function(res) {
          resolve(res.data)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // wxChoose
  wxChoose() {
    return new Promise(function(resolve, reject) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          resolve(res.tempFilePaths[0])
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // wxUpload
  wxUpload(data) {
    data.url = this.setURL(data.url)
    return new Promise(function(resolve, reject) {
      wx.uploadFile({
        url: data.url,
        method: data.method,
        header: data.header,
        filePath: data.path,
        name: data.prefix,
        success: function(res) {
          resolve(res.data)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // wxDownload
  wxDownload(url) {
    return new Promise(function(resolve, reject) {
      wx.downloadFile({
        url: url,
        success: function(res) {
          resolve(res.tempFilePath)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // setURL
  setURL(data) {
    const app = getApp().globalData
    let host = app.host
    if (app.env !== 'pro') {
      host = 'http://localhost:8888'
    }
    return host + data
  }
}
const request = new Image()
module.exports = request