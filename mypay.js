const regeneratorRuntime = require('../libs/regenerator-runtime/runtime.js')
const request = require('./request.js')
const tool = require('./tool.js')

class Mypay {
  mySign(args) {
    if (!args) {
      tool.showModal("参数错误")
      return
    }
    const data = {
      url: "/v5/alipay/sign/" + getApp().globalData.channel,
      method: "POST",
      login: true,
      body: {
        number: args,
        platform: 2,
      }
    }
    request.handle(data).then(result => {
      if (result != undefined) {
        this.myPay(result)
      }
    })
  }
  myPay(number) {
    const self = this
    my.tradePay({
      tradeNO: number,
      success: function(res) {
        getApp().globalData.render = true
        getApp().globalData.isPaySuccess = true;
      },
      fail: function(res) {
        my.alert(res);
      },
    });
  }
}

const mypay = new Mypay()
module.exports = mypay