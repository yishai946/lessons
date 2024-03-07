import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

const width = Dimensions.get("window").width;

const Report = ({ lessons }) => {
  return (
    <View>
      <Text style={styles.header}>Report</Text>
      <View style={styles.container}>
        {lessons.map((item, index) => (
          <View
            style={
              index == lessons.length - 1
                ? { ...styles.item, borderBottomWidth: 0 }
                : styles.item
            }
            key={index}
          >
            <TouchableOpacity>
              <Text style={{ color: "royalblue" }}>Report</Text>
            </TouchableOpacity>
            <Text>
              {item.date} | {item.startTime}
            </Text>
            <Text style={{ fontWeight: "bold" }}>{item.studentName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: width * 0.9,
    borderColor: "#c2c2c2",
    display: "flex",
    borderRadius: 20,
    marginVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    margin: 10,
    marginTop: 30,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#c2c2c2",
    padding: 30,
  },
});
