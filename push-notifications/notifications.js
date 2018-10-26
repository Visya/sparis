// Push dealy compensation notifications to users
// import PushNotifications from 'node-pushnotifications';
let PushNotifications = require('node-pushnotifications');

const settings = {
    gcm: {
        id: null,
        phonegap: false,
    },
    isAlwaysUseFCM: true
};
const push = new PushNotifications(settings);