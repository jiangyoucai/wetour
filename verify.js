class Verify {
  // isEmpty
  isEmpty(data) {
    if (data !== undefined && data !== '') {
      return true
    }
    return false
  }
  // isEmail
  isEmail(data) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!reg.test(data)) {
      return false
    }
    return true
  }
  // isPhone
  isPhone(data) {
    const reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
    if (!reg.test(data)) {
      return false
    }
    return true
  }

  // isCard  身份证
  isCard(data) {
    const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|x|X)$/;
    if (!reg.test(data)) {
      return false;
    }
    return true;
  }
}

const verify = new Verify()
module.exports = verify