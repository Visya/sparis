var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sparis-beb69.firebaseio.com",
});

var message = {
  data: {
    message: 'Försening på gröna linjen',
    buttonData: 'foobar',
  }
};

var dryRun = tr;
admin.messaging().send(message, dryRun)
  .then((response) => {
    // Response is a message ID string.
    console.log('Dry run successful:', response);
  })
  .catch((error) => {
    console.log('Error during dry run:', error);
  });


/*
var topic = 'subway-green';

// See documentation on defining a message payload.
var message = {
  data: {
    message: 'Försening på gröna linjen',
    buttonData: 'foobar',
  },
  topic: topic
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
*/