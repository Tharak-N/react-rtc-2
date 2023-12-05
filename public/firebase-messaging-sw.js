// Service worker file for receving push notifications

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { Controls } from '../../public/firebase-messaging-sw'

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
export const requestToken = async () => {
  console.log("reaching token")
  const swk = await navigator.serviceWorker.register('../firebase-messaging-sw.js')
  console.log(swk)
  return getToken(messaging, { vapidKey: 'L9l0fADuw42dHL2ielrrEX3OlajZYyLMW-HVRVMsCow', serviceWorkerRegistration: swk }).then((token) => {
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