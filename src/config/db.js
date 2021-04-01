import Firebase from "firebase";
let config = {
  apiKey: "AIzaSyDUALcE1PzuC_CGEtYmEraWilt3pbh1iQI",
  authDomain: "kermes-siparis.firebaseapp.com",
  databaseURL: "https://kermes-siparis-default-rtdb.firebaseio.com",
  projectId: "kermes-siparis",
  storageBucket: "kermes-siparis.appspot.com",
  messagingSenderId: "784807687947",
  appId: "1:784807687947:web:62a3e22f9932d80ab3940e"
};

let app = Firebase.apps.length
  ? Firebase.app()
  : Firebase.initializeApp(config);

export const db = app.database();
