var cheerio = require('cheerio');

getOptionsForSelect = function(data, selectName) {
  var $ = cheerio.load(data, { decodeEntities: false });
  var data = $("select[name='" + selectName + "']")

  var values = [];
  data.find('option').each(function() {
    values.push($(this).html());
  });
  return values
}

module.exports = {
  getCompensationTypes: function(data) {
    return getOptionsForSelect(data, "data.issue.ext.compensation_type")
  },
  getDelay: function(data) {
    return getOptionsForSelect(data, "data.issue.compensation.type.priceDeduction.delay")
  },
  getDate: function(data) {
    return getOptionsForSelect(data, "data.issue.date")
  },
  getTravelType: function(data) {
    return getOptionsForSelect(data, "data.issue.travel.type")
  },
  getAuthorizeAddress: function(payload) {
    return payload.substring(
                      payload.indexOf("CsrfGuard.Authorize('/api") + 21,
                      payload.length - 4
                    )
  }
}
