import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";

const Login = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text>email</Text>
      <TextInput style={styles.input} />
      <Text>password</Text>
      <TextInput style={styles.input} />
      <TouchableOpacity
        onPress={() => console.log("login")}
        style={{...styles.button, backgroundColor: "royalblue", marginTop: 30}}
      >
        <Text style={{fontSize: 16, color: "white"}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        color={"black"}
        style={styles.button}
      >
        <Text>Signup</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width: "40%",
    borderRadius: 20,
    padding: 15,
    margin: 10,
  },
});
