import get from 'lodash.get';
import reduce from 'lodash.reduce';

const staticFields = {
  '[name="data.issue.ext.compensation_type"]': () => 'Prisavdrag',
  '[name="data.issue.date"]': () => 'Idag',
  '[name="data.issue.time"]': () => getCurrentTime(),
  '[name="data.issue.travel.type"]': 'delayInfo.type',
  '[name="data.issue.travel.destination"]': 'delayInfo.to',
  '[name="data.issue.comment"]': () => 'Hej! Jag försökte genomföra resan enligt det som angivits i formuläret men råkade ut för försening orsakad av er.',
  '[name="data.issue.ticket.type"]': () => 'Biljett på SL Access-kort',
  '[name="data.issue.ext.compensation_refound"]': () => 'Bankkonto',
  '[name="data.issue.contact.person_number"]': 'contactInfo.id',
  '[name="data.issue.contact.first_name"]': 'contactInfo.name',
  '[name="data.issue.contact.last_name"]': 'contactInfo.surname',
  '[name="data.issue.contact.address.care_of"]': 'contactInfo.co',
  '[name="data.issue.contact.address.street"]': 'contactInfo.address',
  '[name="data.issue.contact.address.zip_code"]': 'contactInfo.zip',
  '[name="data.issue.contact.address.city"]': 'contactInfo.city',
  '[name="data.issue.contact.address.country"]': 'contactInfo.country',
  '[name="data.issue.contact.email"]': 'contactInfo.email',
  '[name="data.issue.contact.phone"]': 'contactInfo.phone'
};

const dynamicFields = {
  '[name="data.issue.compensation.type.priceDeduction.delay"]': 'delayInfo.time',
  '#price_deduction_ticket_type': 'slCard.ticketType',
  '[name="data.traffic_line_range"]': (data = {}) => isBuss ? getRange(data.delayInfo.line) : null,
  '[name="data.issue.travel.line"]': 'delayInfo.line',
  '[data-ng-model="data.special.travel.from"]': 'delayInfo.from',
  '[data-ng-model="data.special.travel.to"]': 'delayInfo.to',
  'travel_card.serial_number1': (data = {}) => data.slCard.cardNumber.substring(5)[0],
  'travel_card.serial_number2': (data = {}) => data.slCard.cardNumber.substring(5)[1],
  '[name="data.issue.compensation.refound.bank.clearing"]': 'bankAccount.clearingNumber',
  '[name="data.issue.compensation.refound.bank.account"]': 'bankAccount.account',
};


export const testData = {
  slCard: { ticketType: 'årsbiljet, vuxen', cardNumber: '1234554321' },
  bankAccount: { type: 'Bankkonto', clearingNumber: '12345', account: '12345' },
  contactInfo: {
    id: '199001203434',
    name: 'Marcus',
    surname: 'Mson',
    co: 'Alissa A',
    address: 'Kungsgatan 2',
    zip: '12345',
    city: 'Nacka',
    country: 'Sverige',
    email: 'm@i.com',
    phone: '0791234556'
  },
  delayInfo: {
    type: 'Buss',
    line: '302',
    from: 'Cityterminalen',
    to: 'Broparken',
    time: '20-39 minuter'
  }
};

const helperFunctions = `
function waitForElToExist(selector, handler, maxDelay) {
  var element = $(selector);
  
  if (typeof maxDelay === 'undefined') maxDelay = 500;
  if (maxDelay < 0) return;
  
  if (element.length) {
    handler(element);
  } else {
    setTimeout(function() {
      waitForElToExist(selector, handler, maxDelay - 500);
    }, 500);
  }
}

function waitForElementToBeVisible(selector, handler, errorHandler, maxDelay) {
  var isVisible = $(selector).is(':visible');
  
  $('.page-header').append('<p>blah' + isVisible + ' ' + maxDelay + '</p>')
  
  if (maxDelay <= 0) {
    errorHandler();
    return;
  }
  
  if (isVisible) {
    handler($(selector));
  } else {
    setTimeout(function() {
      waitForElementToBeVisible(selector, handler, errorHandler, maxDelay - 500);
    }, 500);
  }
}

function findValue(selector, value) {
  var el = $(selector);
  
  if (el.is('select')) {
    return $(selector + ' option:contains(' + value + ')').val();
  }
  
  return value;
}
`;

export function convertDataToInstructions(data) {
  const staticFieldsScript = reduce(staticFields, (result, selector, fn) => {
    const value = typeof fn === 'function' ? fn(data) : get(data, fn);
    return `${result}$('${selector}').val(findValue(${value})).change()\n`;
  }, '');

  const dynamicFieldsScript = reduce(dynamicFields, (result, selector, fn) => {
    const value = typeof fn === 'function' ? fn(data) : get(data, fn);
    return `${result}
      waitForElToExist('${selector}', function(el) {
        el.val(findValue(${value})).change();
      });
    `;
  }, '');

  return `${staticFieldsScript}\n${dynamicFieldsScript}`;
}

export function createScript(data) {
  return `
    (function() {
    /* onMessage patch */
    var originalPostMessage = window.postMessage;
    /* onMessage patch end */
    
    ${helperFunctions}
    
    ${convertDataToInstructions(data)}
    
    //$('.refund-form [type='submit']').click();
    
    waitForElementToBeVisible('#refundFormReceipt', function() {
      //$('#refundFormReceipt .button-primary').click() 
    }, function() {
      window.postMessage('Oh no!')
    }, 10000);
    
    })();
  `;
}
