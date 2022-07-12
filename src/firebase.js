import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC9GLwHhDExeyJO6gi8qa5QcrA3S8kLdPM",
    authDomain: "patrygram-bfd56.firebaseapp.com",
    projectId: "patrygram-bfd56",
    storageBucket: "patrygram-bfd56.appspot.com",
    messagingSenderId: "555902429903",
    appId: "1:555902429903:web:64fd41dfa6f63f581c25ba"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth();

export { auth}
export default db;