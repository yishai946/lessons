import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

const Lesson = ({ lesson, openOptions, withOptions }) => {
  const startTime = lesson.startTime;
  const endTime = lesson.endTime;

  return (
    <View style={!lesson.done ? styles.container : {...styles.container, borderColor: "green" }}>
      {withOptions && (
        <TouchableOpacity
          style={styles.dots}
          onPress={() => openOptions(lesson)}
        >
          <Entypo name="dots-three-horizontal" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.name}>{lesson.studentName}</Text>
      <View style={styles.row}>
        <Text>START</Text>
        <Text>{startTime}</Text>
      </View>
      <View style={styles.row}>
        <Text>END</Text>
        <Text>{endTime}</Text>
      </View>
      <View style={styles.row}>
        <Text>NOTES</Text>
        <Text>{lesson.notes != "" ? lesson.notes : "........"}</Text>
      </View>
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
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dots: {
    position: "absolute",
    right: 15,
    top: 10,
  },
});
