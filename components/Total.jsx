import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Total = ({ hours, money }) => {
  const progress = parseInt((hours / 80) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.col}>
          <Text style={styles.header}>Hours</Text>
          <Text style={{ fontSize: 18 }}>{hours}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.header}>Money</Text>
          <Text style={{ fontSize: 18 }}>{money} ₪</Text>
        </View>
      </View>
      <Text style={{ alignSelf: "center", marginVertical: 5 }}>
        {progress}%
      </Text>
      {/* progress bar */}
      <View style={styles.backgroundBar}>
        <View
          style={{
            backgroundColor: "green",
            borderRadius: 20,
            height: 20,
            width: `${progress}%`,
          }}
        />
      </View>
    </View>
  );
};

export default Total;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
  backgroundBar: {
    backgroundColor: "lightgrey",
    borderRadius: 20,
    height: 20,
    width: "100%",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  }
});
