var firebase = require("firebase");
var firebaseui = require("firebaseui");
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAiBV9rUOFp4PVsuis3w3pNraye-INj0Z0",
  authDomain: "klank-dev.firebaseapp.com",
  databaseURL: "https://klank-dev.firebaseio.com",
  projectId: "klank-dev",
  storageBucket: "klank-dev.appspot.com",
  messagingSenderId: "326095185487",
  appId: "1:326095185487:web:66c930667a0a32df496c3a",
  measurementId: "G-G3JQBNQRTG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());

exports.firebaseUI = function () {
  return ui;
};
exports.onAuthStateChangedImpl = function (j) {
  return function (n) {
    return function (uf) {
      return function () {
        console.log("Setting auth state change");
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            uf(
              j({
                displayName: user.displayName,
                uid: user.uid,
              })
            );
          } else {
            uf(n);
          }
        });
      };
    };
  };
};
exports.attachFirebaseUIToElement = function (e) {
  return function (ui) {
    return function () {
      ui.start(e, {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            //console.log(authResult);
            return true;
          },
        },
        signInSuccessUrl: process.env.REDIRECT_URI,
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        ],
      });
    };
  };
};
