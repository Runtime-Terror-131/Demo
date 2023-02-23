// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_M_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const register = async (email, password, setUser) => {
  try {
    let user = await createUserWithEmailAndPassword(auth, email, password);
    setUser(user);
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};
const loginUser = async (email, password, setUser, setLoginErrorMessage) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      setLoginErrorMessage(error.message);
    });
};
const logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("userData");
      console.log("user signed out");
    })
    .catch((error) => {
      console.log(error);
    });
};
const checkIfUserStillLoggedIn = (user, setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      localStorage.setItem("userData", user);
      //const uid = user.uid;
      // ...
    } else {
      return false;
    }
  });
};
export { auth, register, loginUser, logout, checkIfUserStillLoggedIn };
