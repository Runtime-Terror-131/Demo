// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
  updateProfile,
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
const register = async (
  email,
  password,
  setUser,
  setShowUserError,
  setShowSpinner,
  setHideBackground
) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    setShowUserError(error.message);
    setShowSpinner(false);
    setHideBackground(false);
  }
};
const loginUser = async (
  email,
  password,
  setUser,
  setLoginErrorMessage,
  setShowSpinner
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      setUser(user);
      //setShowSpinner(false);
      return user;
      // ...
    })

    .catch((error) => {
      const errorCode = error.code;
      setLoginErrorMessage(error.message);
      setShowSpinner(false);
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
      localStorage.setItem("userData", JSON.stringify(user));
      //const uid = user.uid;
      // ...
    } else {
      return false;
    }
  });
};
export { auth, register, loginUser, logout, checkIfUserStillLoggedIn };
