import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import { useAppContext } from "../context/appContext";
import Total from "../components/Total";

const Home = () => {
  const { user } = useAppContext();

  return (
    <SafeAreaView>
      <Total hours={user.hours} money={user.money} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
