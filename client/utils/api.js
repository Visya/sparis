var navigatorUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"

var slBaseURL = 'https://sl.se'
var delayAddress = slBaseURL + '/sv/info/kundservice/resegarantin/forseningsersattning/'
var authorizeAddress = ''

var csrfChallenge = ''

var axios = require('axios');

var challenge = require('./api/challenge.js')
var parser = require('./api/parser.js')

var headers = {
    'User-Agent': navigatorUserAgent
};

axios.get(delayAddress, { headers: headers })
          .then(response => {
            payload = parser.getPayload(response.data);
            //console.log(payload)
            authorizationHash = parser.getAuthorizationHash(payload)
            table = parser.getCrc32Table(payload)
            authorizeAddress = parser.getAuthorizeAddress(payload)

            csrfChallenge = challenge.getCsrfChallenge(navigatorUserAgent, delayAddress, table)
            console.log(csrfChallenge)
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });
