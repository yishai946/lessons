import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useAppContext } from "../context/appContext";
import { auth } from "../firebaseConfig";
import LoginSignup from "../screens/LoginSignup";
import Tabs from "./Tabs";

const stack = createNativeStackNavigator();

const Stack = () => {
  const { user, setUser, loading, setLoading } = useAppContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if(loading){
          setLoading(false);
        }
        setUser(user);
      } else {
        if(loading){
          setLoading(false);
        }
        setUser(null);
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
