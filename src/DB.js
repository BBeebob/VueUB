// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  getFirestore /*collection
, getDocs*/,
} from "firebase/firestore";
import {
  getAuth,
  // signInWithEmailAndPassword,
  // onAuthStateChanged,
} from "firebase/auth";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCD7lvEshVoJM6smIKZCWNKyizm2TuPBKA",
  authDomain: "projectub-f79e6.firebaseapp.com",
  databaseURL:
    "https://projectub-f79e6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectub-f79e6",
  storageBucket: "projectub-f79e6.appspot.com",
  messagingSenderId: "159605248055",
  appId: "1:159605248055:web:f6351ede985a088e032fb2",
  measurementId: "G-WE57TPVD3M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const db = getFirestore(app);

/*export async function getities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}*/

export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
// export const storage = getStorage(app);

export function stringToColour(str = "") {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    const cc = "00" + value.toString(16);
    colour = colour + cc.slice(-2);
  }
  const name = str.slice(0, 2);
  return { color: colour, name };
}
