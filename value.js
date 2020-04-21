class Value {
  // get
  get(key) {
    return wx.getStorageSync(key)
  }

  // set
  set(key, data) {
    return wx.setStorageSync(key, data)
  }

  // del
  del(key) {
    return wx.removeStorageSync(key)
  }

  // clear
  clear() {
    return wx.clearStorageSync()
  }
}

const value = new Value()
module.exports = value