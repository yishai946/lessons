import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import Modal from "react-native-modal";

const Students = () => {
  const { modalVisible, setModalVisible, students, addStudent } =
    useAppContext();
  const [newStudent, setNewStudent] = useState({});

  const add = () => {
    if (
      newStudent.name &&
      newStudent.hours &&
      newStudent.id &&
      newStudent.study &&
      newStudent.subject
    ) {
      addStudent(newStudent);
      // setNewStudent({});
      setModalVisible(false);
    } else {
      Alert.alert("Please fill all the fields");
    }
  };

  return (
    <View>
      <Text>Students</Text>

      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modal}
          propagateSwipe={true}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="gray"
              value={newStudent.name}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Hours"
              keyboardType="numeric"
              returnKeyType="done"
              placeholderTextColor="gray"
              value={newStudent.hours ? newStudent.hours.toString() : ""}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, hours: parseFloat(text) })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="ID"
              placeholderTextColor="gray"
              value={newStudent.id}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, id: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Study"
              placeholderTextColor="gray"
              value={newStudent.study}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, study: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Subject"
              placeholderTextColor="gray"
              value={newStudent.subject}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, subject: text })
              }
            />
            <TouchableOpacity style={styles.modalButton} onPress={add}>
              <Text style={{ color: "white" }}>Add Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setNewStudent({});
              }}
              style={{
                ...styles.modalButton,
                marginBottom: 30,
                backgroundColor: "#e1e1e1",
              }}
            >
              <Text>Clear</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </View>
  );
};

export default Students;

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
  modalButton: {
    fontSize: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginBottom: 15,
    backgroundColor: "royalblue",
    borderRadius: 8,
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  inputText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
