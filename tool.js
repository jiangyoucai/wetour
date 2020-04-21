class Tool {
  // showToast
  showToast(message) {
    if (message === undefined) {
      message = 'success'
    }
    wx.showToast({
      title: message,
    })
  }
  
  // hideToast
  hideToast() {
    wx.hideToast()
  }

  // showLoading
  showLoading(message) {
    if (message === undefined) {
      message = 'loading'
    }
    wx.showLoading({
      title: message,
    })
  }

  // hideLoading
  hideLoading() {
    wx.hideLoading()
  }


  // showModal
  showModal(message, show) {
    return new Promise(function(resolve, reject) {
      wx.showModal({
        title: '提示',
        content: message,
        showCancel: show !== undefined,
        confirmColor: '#3abd53',
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        },
      })
    })
  }

  // navigationBar
  navigationBar(message) {
    return new Promise(function(resolve, reject) {
      wx.setNavigationBarTitle({
        title: message,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // navigationBarColor
  navigationBarColor(frontColor, backgroundColor) {
    return new Promise(function(resolve, reject) {
      wx.setNavigationBarColor({
        frontColor: frontColor,
        backgroundColor: backgroundColor,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // setTabBarBadge
  setTabBarBadge(index, message) {
    return new Promise(function(resolve, reject) {
      wx.setTabBarBadge({
        index: index,
        text: message,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // removeTabBarBadge
  removeTabBarBadge(index) {
    return new Promise(function(resolve, reject) {
      wx.removeTabBarBadge({
        index: index,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // showTabBarRedDot
  showTabBarRedDot(index) {
    return new Promise(function(resolve, reject) {
      wx.showTabBarRedDot({
        index: index,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // hideTabBarRedDot
  hideTabBarRedDot(index) {
    return new Promise(function(resolve, reject) {
      wx.hideTabBarRedDot({
        index: index,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // topBar
  topBar(message) {
    return new Promise(function(resolve, reject) {
      wx.setTopBarText({
        text: message,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // navigateTo
  navigateTo(url) {
    return new Promise(function(resolve, reject) {
      wx.navigateTo({
        url: url,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // redirectTo
  redirectTo(url) {
    return new Promise(function(resolve, reject) {
      wx.redirectTo({
        url: url,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // switchTab
  switchTab(url) {
    return new Promise(function(resolve, reject) {
      wx.switchTab({
        url: url,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // navigateBack
  navigateBack(delta) {
    return new Promise(function(resolve, reject) {
      wx.navigateBack({
        delta: delta,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  }

  // reLaunch
  reLaunch(url) {
    return new Promise(function(resolve, reject) {
      wx.reLaunch({
        url: url,
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

const tool = new Tool()
module.exports = tool