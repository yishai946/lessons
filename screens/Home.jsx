import { Button, StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import { auth } from "../firebaseConfig";

const Home = () => {

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={() => {
          auth.signOut();
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
