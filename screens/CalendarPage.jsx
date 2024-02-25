import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useAppContext } from "../context/appContext";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import MyAgenda from "../components/MyAgenda";

const CalendarPage = () => {
  const initDate = new Date().toISOString().split("T")[0];
  const {
    lessons,
    addLesson,
    modalVisible,
    setModalVisible,
    students,
    loading,
    setLoading,
  } = useAppContext();
  const [newLesson, setNewLesson] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    student: students[0],
  });
  const [studentsArr, setStudentsArr] = useState([]);
  const [selected, setSelected] = useState(initDate); // State for selected date
  const [date, setDate] = useState(new Date().toISOString()); // State for current date

  useEffect(() => {
    const temp = students.filter((student) => student.hours > 0);
    setStudentsArr(temp);
  }, [students]);

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

  const add = async () => {
    try {
      setLoading(true);
      await addLesson(newLesson);
      closeModal();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

    const handleDayPress = (selectedDate) => {
      setSelected(selectedDate.dateString); // Update selected date
      setDate(selectedDate.dateString); // Update current date
    };

    const marked = React.useMemo(
      () => ({
        [selected]: {
          selected: true,
          selectedColor: "royalblue",
          selectedTextColor: "#ffffff",
        },
      }),
      [selected]
    );


  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        initialDate={initDate}
        markedDates={marked}
      />

      {/* <View style={{width: 500, height: 500}}><MyAgenda /></View> */}

      <Modal
        isVisible={modalVisible && studentsArr.length > 0}
        onBackdropPress={closeModal}
        style={styles.modal}
        propagateSwipe={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                {studentsArr.map((student) => (
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

            <View style={styles.row}>
              <Text style={styles.modalText}>Notes</Text>
              <TextInput
                style={styles.notes}
                multiline={true}
                onChangeText={(text) =>
                  setNewLesson({ ...newLesson, notes: text })
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
              <TouchableOpacity style={styles.modalButton} onPress={add}>
                <Text style={{ color: "white" }}>Add Lesson</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CalendarPage;

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
  notes: {
    width: "70%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});
