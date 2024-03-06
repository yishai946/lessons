import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const width = Dimensions.get("window").width;

const Lesson = ({ lesson }) => {

  // const startToEndDiffInMinutes = (secondsEnd - secondsStart) / 60;
  // const dots = ".".repeat(Math.max(0, startToEndDiffInMinutes - 5)); // Subtracting 5 for the length of start and end time

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{lesson.studentName}</Text>
      <View style={styles.row}>
        <Text>{lesson.startTime}</Text>
        {/* <Text>{dots}</Text> */}
        <Text>{lesson.endTime}</Text>
      </View>
      <Text>{lesson.notes}</Text>
    </View>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: width * 0.9,
    borderColor: "#c2c2c2",
    paddingVertical: 30,
    display: "flex",
    borderRadius: 20,
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  row: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
