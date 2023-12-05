
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCUvbpdvsUyaMHDnyrToKDAqW22yaTiRSk",
  authDomain: "good-game-67b7e.firebaseapp.com",
  projectId: "good-game-67b7e",
  storageBucket: "good-game-67b7e.appspot.com",
  messagingSenderId: "597697528381",
  appId: "1:597697528381:web:a676d8c24bcf66d9d6e054",
  measurementId: "G-GJM3XMXV5E"
}

const app = initializeApp(firebaseConfig);

// intialiing firebase cloud message
const messaging = getMessaging(app);

// registration token for app instance 
export const requestToken = () => {
  console.log("reaching token")
  return getToken(messaging, { vapidKey: 'L9l0fADuw42dHL2ielrrEX3OlajZYyLMW-HVRVMsCow' }).then((token) => {
    if(token){
      console.log("the user token is", token)
    }
    else {
  
    }
  })
  .catch((error) => {
    console.log("Error is", error)
  })
}


// notification request 
export const requestNotificationAccess = () => {
  Notification.requestPermission()
  .then((permission) => {
    if(permission === 'granted'){
      requestToken()
    }
    else if(permission === 'denied'){
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
}