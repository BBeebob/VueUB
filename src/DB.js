// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export const firebaseConfig = {
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
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export async function getities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
