module.exports = {

  request: function (req, token) {
    this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
  },

  response: function (res) {
    let token = res.body.jwt
    if (token) {
      return token
    }
  }
}
