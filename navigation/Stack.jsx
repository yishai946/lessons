import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import { onAuthStateChanged } from "firebase/auth";

const stack = createNativeStackNavigator();

const Stack = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    });
    return unsubscribe;
  }, [authenticated]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {authenticated ? (
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name="Home" component={Home} />
        </stack.Navigator>
      ) : (
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Signup" component={Signup} />
        </stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Stack;

const styles = StyleSheet.create({});
