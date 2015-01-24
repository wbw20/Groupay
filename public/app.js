$(document).ready(function() {
  var firebase = new Firebase("https://groupay.firebaseio.com/");


  firebase.set({
    title: "Hello World!",
    author: "Firebase",
    location: {
      city: "San Francisco",
      state: "California",
      zip: 94103
    }
  });
});
