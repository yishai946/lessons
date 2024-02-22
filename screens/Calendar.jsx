import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const Calendar = () => {
  const { lessons, addLesson, modalVisible, setModalVisible, students } =
    useAppContext();
  const [newLesson, setNewLesson] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    student: students[0],
  });

  const closeModal = () => {
    setModalVisible(false);
    setNewLesson({
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      student: students[0],
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setNewLesson({ ...newLesson, date: selectedDate });
  };

  const handlePickStartTime = (event, selectedDate) => {
    setNewLesson({ ...newLesson, startTime: selectedDate });
  };

  const handlePickEndTime = (event, selectedDate) => {
    setNewLesson({ ...newLesson, endTime: selectedDate });
  };

  const handleStudentChange = (name) => {
    const selected = students.find((student) => student.name === name);
    setNewLesson({ ...newLesson, student: selected });
  };

  return (
    <View>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          onBackdropPress={closeModal}
          style={styles.modal}
          propagateSwipe={true}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={{ alignItems: "center" }}>
              {/* <Text style={styles.modalText}>Student</Text> */}
              <Picker
                selectedValue={newLesson.student.name}
                onValueChange={(itemValue, itemIndex) =>
                  handleStudentChange(itemValue)
                }
                style={{ width: "100%" }}
              >
                {students.map((student) => (
                  <Picker.Item
                    key={student.id}
                    label={student.name}
                    value={student.name}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.row}>
              <Text style={styles.modalText}>Date</Text>
              <DateTimePicker
                value={newLesson.date}
                mode={"date"}
                onChange={(event, selectedDate) =>
                  handleDateChange(event, selectedDate)
                }
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.modalText}>Start</Text>
              <DateTimePicker
                value={newLesson.startTime}
                mode={"time"}
                onChange={(event, selectedDate) =>
                  handlePickStartTime(event, selectedDate)
                }
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.modalText}>End</Text>
              <DateTimePicker
                value={newLesson.endTime}
                mode={"time"}
                onChange={(event, selectedDate) =>
                  handlePickEndTime(event, selectedDate)
                }
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={{
                  ...styles.modalButton,
                  backgroundColor: "#e1e1e1",
                }}
                onPress={closeModal}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton}>
                <Text style={{ color: "white" }}>Add Lesson</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    paddingBottom: 40,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingRight: 15,
    paddingLeft: 20,
  },
  modalText: {
    // color: "white",
    fontSize: 18,
  },
  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  modalButton: {
    fontSize: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginBottom: 15,
    backgroundColor: "royalblue",
    borderRadius: 8,
    width: "48%",
  },
});
