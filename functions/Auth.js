import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
      console.log(error);
      return error;
    }
  },
  logout: async () => {
    try {
      await auth.signOut();
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default Auth;