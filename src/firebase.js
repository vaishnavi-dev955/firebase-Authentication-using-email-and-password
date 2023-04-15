// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCdRaYlcuKAZlHmLZ4eBL43JDFfEzIzutI',
  authDomain: 'newfirebaseauthenticatio-eaf52.firebaseapp.com',
  projectId: 'newfirebaseauthenticatio-eaf52',
  storageBucket: 'newfirebaseauthenticatio-eaf52.appspot.com',
  messagingSenderId: '310164433960',
  appId: '1:310164433960:web:20313740fb9ad440d2991d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
