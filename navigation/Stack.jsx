import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useAppContext } from "../context/appContext";
import { auth, db } from "../firebaseConfig";
import LoginSignup from "../screens/LoginSignup";
import Tabs from "./Tabs";
import { getDoc, doc, setDoc, collection } from "firebase/firestore";

const stack = createNativeStackNavigator();

const Stack = () => {
  const { user, setUser, loading, setLoading } = useAppContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          let docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            await setDoc(docRef, {
              email: user.email,
              hours: 0,
              money: 0,
            });

            docSnap = await getDoc(docRef);
          }

          setUser(docSnap.data());
        } else {
          if (loading) {
            setLoading(false);
          }
          setUser(null);
        }
      } catch (e) {
        console.log(e);
      }
      finally {
        if (loading) {
          setLoading(false);
        }
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {user ? (
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name="Tabs" component={Tabs} />
        </stack.Navigator>
      ) : (
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name="Auth" component={LoginSignup} />
        </stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Stack;
