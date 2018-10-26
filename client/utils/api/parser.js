module.exports = {
  getPayload: function(data) {
    payload = data.substring(
                      data.indexOf('unescape') + 9,
                      data.indexOf("</head>")
                    )
    payload = payload.substring(0, payload.indexOf("))"))
    payload = eval(unescape(payload))
    return payload
  },
  getAuthorizationHash: function(payload) {
    return payload.substring(
                      payload.indexOf("CsrfGuard.Authorization = '") + 27,
                      payload.indexOf("CsrfGuard.Authorize('/api") - 4
                    )
  },
  getCrc32Table: function(payload) {
    crc32Table = payload.substring(
                      payload.indexOf("Crc32Table = ") + 13,
                      payload.indexOf("CsrfGuard.UserAgent = ") - 3
                    )
    return JSON.parse(crc32Table)
  },
  getAuthorizeAddress: function(payload) {
    return payload.substring(
                      payload.indexOf("CsrfGuard.Authorize('/api") + 21,
                      payload.length - 4
                    )
  }
}
