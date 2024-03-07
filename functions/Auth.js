import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const Auth = {
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  signup: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential.user;
    } catch (error) {
      return error;
    }
  },
};

export default Auth;
