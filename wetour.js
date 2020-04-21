const account = require('./account.js')
const image = require('./image.js')
const mypay = require('./mypay.js')
const request = require('./request.js')
const time = require('./time.js')
const tool = require('./tool.js')
const value = require('./value.js')
const verify = require('./verify.js')
const wechat = require('./wechat.js')
const wxpay = require('./wxpay.js')

const wetour = {
  'account': account,
  'image': image,
  'mypay': mypay,
  'request': request,
  'time': time,
  'tool': tool,
  'value': value,
  'verify': verify,
  'wechat': wechat,
  'wxpay': wxpay,
}
module.exports = wetour