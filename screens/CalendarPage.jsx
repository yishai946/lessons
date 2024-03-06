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
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { useAppContext } from "../context/appContext";
import { Calendar } from "react-native-calendars";
import Lesson from "../components/Lesson";

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
  const [selected, setSelected] = useState(initDate);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [markedDatesObject, setMarkedDatesObject] = useState({});

  useEffect(() => {
    const temp = students.filter((student) => student.hours > 0);
    setStudentsArr(temp);
  }, [students]);

  useEffect(() => {
    if (lessons.length > 0) {
      filterLessons();
      updateLessonDates();
    }
  }, [lessons, selected]);

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

      // Check if end time is before start time
      if (newLesson.endTime < newLesson.startTime) {
        throw new Error("End time cannot be before start time.");
      }

      const lesson = {
        ...newLesson,
        student: newLesson.student.id,
        studentName: newLesson.student.name,
        date: newLesson.date.toISOString().split("T")[0], // Extract date part from ISO string
        startTime: newLesson.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }), // Convert time to a string in the format "HH:MM"
        endTime: newLesson.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }), // Convert time to a string in the format "HH:MM"
      };

      await addLesson(lesson);
      closeModal();
    } catch (e) {
      Alert.alert(e.message); // Display the error message in the alert
    } finally {
      setLoading(false);
    }
  };

  const handleDayPress = (selectedDate) => {
    setSelected(selectedDate.dateString);
  };

  const filterLessons = () => {
    const filtered = lessons.filter((lesson) => {
      if (lesson.date) {
        return lesson.date === selected;
      }
      return false;
    });

    filtered.sort((a, b) => {
      const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes; // Convert hours to minutes and add minutes
      };

      const startTimeA = parseTime(a.startTime);
      const startTimeB = parseTime(b.startTime);

      return startTimeA - startTimeB;
    });

    setFilteredLessons(filtered);
  };

  const updateLessonDates = () => {
    const dates = lessons.reduce((acc, lesson) => {
      if (lesson.date) {
        acc[lesson.date] = { marked: true, dotColor: "royalblue" };
      }
      return acc;
    }, {});

    const markedDatesObject = {
      ...dates,
      [selected]: {
        selected: true,
        selectedColor: "royalblue",
        selectedTextColor: "#ffffff",
      },
    };

    setMarkedDatesObject(markedDatesObject);
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        initialDate={initDate}
        markedDates={markedDatesObject}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredLessons.map((lesson, index) => (
          <Lesson key={index} lesson={lesson} />
        ))}
      </ScrollView>

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
            {/* students */}
            <View style={{ alignItems: "center" }}>
              <Picker
                selectedValue={newLesson.student ? newLesson.student.name : ""}
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

            {/* date */}
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

            {/* start time*/}
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

            {/* end time */}
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

            {/* notes */}
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

            {/* buttons */}
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
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  scrollView: {
    height: "50%",
    alignSelf: "center",
    padding: 10,
  },
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
