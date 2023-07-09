import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjy10XocFTPCsOTMBQ7Bk-vbPLVt4zp5k",
    authDomain: "crud-projesi-9caa3.firebaseapp.com",
    projectId: "crud-projesi-9caa3",
    storageBucket: "crud-projesi-9caa3.appspot.com",
    messagingSenderId: "884483268280",
    appId: "1:884483268280:web:fd2755adb71c4526b31e4d",
    measurementId: "G-YHX0FEV6NC"
};

// Firebase'i başlatma
initializeApp(firebaseConfig);

// Firestore ve Authentication için örnek bağlantıları oluşturma
const db = getFirestore()

export { db };