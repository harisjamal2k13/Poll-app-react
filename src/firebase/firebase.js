import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB69WaE_czpa9xIJZ0MsrviWgfOLqu0AvY",
    authDomain: "jamhoriat-539ae.firebaseapp.com",
    databaseURL: "https://jamhoriat-539ae.firebaseio.com",
    projectId: "jamhoriat-539ae",
    storageBucket: "jamhoriat-539ae.appspot.com",
    messagingSenderId: "95394206935"
  };
 
const fire = firebase.initializeApp(config);

export default fire;