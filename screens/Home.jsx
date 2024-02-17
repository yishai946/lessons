import { Button, StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import Auth from "../functions/Auth";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={() => {
          Auth.logout();
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
