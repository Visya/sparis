var navigatorUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"

var slBaseURL = 'https://sl.se'
var delayAddress = slBaseURL + '/sv/info/kundservice/resegarantin/forseningsersattning/'
var authorizeAddress = ''

var csrfChallenge = ''

var axios = require('axios');
var cheerio = require('cheerio');

var challenge = require('./api/challenge.js')
var authenticationParser = require('./api/authenticationParser.js')
var formParser = require('./api/formParser.js')

var headers = {
    'User-Agent': navigatorUserAgent,
    'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
};

getChallenge = function() {
  axios.get(delayAddress, { headers: headers })
            .then(response => {
              payload = authenticationParser.getPayload(response.data);
              //console.log(payload)
              authorizationHash = authenticationParser.getAuthorizationHash(payload)
              table = authenticationParser.getCrc32Table(payload)
              authorizeAddress = authenticationParser.getAuthorizeAddress(payload)

              csrfChallenge = challenge.getCsrfChallenge(navigatorUserAgent, delayAddress, table)
              console.log(csrfChallenge)
            })
            .catch((error) => {
              console.log('error 3 ' + error);
            });
}

loadForm = function() {
  axios.get(delayAddress, { headers: headers })
            .then(response => {
              console.log(formParser.getCompensationTypes(response.data))
              console.log(formParser.getDelay(response.data))
              console.log(formParser.getDate(response.data))
              console.log(formParser.getTravelType(response.data))
            })
            .catch((error) => {
              console.log('error 3 ' + error);
            });
}

loadForm();
