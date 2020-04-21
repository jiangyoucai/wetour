const regeneratorRuntime = require('../libs/regenerator-runtime/runtime.js')
const request = require('./request.js')
const tool = require('./tool.js')

class Wxpay {
  // 支付签名
  wxSign(args) {
    if (!args) {
      tool.showModal("参数错误")
      return
    }
    const data = {
      url: "/v5/wxpay/sign/" + getApp().globalData.channel,
      method: "POST",
      login: true,
      body: {
        number: args,
        platform: 2,
      }
    }
    request.handle(data).then(result => {
      if (result != undefined) {
        this.wxPay(result)
      }
    })
  }
  // 调起支付
  wxPay(args) {
    wx.requestPayment({
      'timeStamp': args.timeStamp,
      'nonceStr': args.nonceStr,
      'package': args.package,
      'signType': 'MD5',
      'paySign': args.paySign,
      'success': function(res) {
        getApp().globalData.render = true
        getApp().globalData.isPaySuccess = true;
      },
      'fail': function(res) {
        tool.showModal(res)
      }
    })
  }
}

const wxpay = new Wxpay()
module.exports = wxpay