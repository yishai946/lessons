import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Auth from "../functions/Auth";

const windowWidth = Dimensions.get("window").width;

const LoginSignup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try{
      const res = await Auth.login(email, password);
    }
    catch(error){
      console.log(error)
    }
  }

  const signup = async () => {
    try{
      const res = await Auth.signup(email, password);
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Lessons</Text>
          <Text>email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <Text>password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <TouchableOpacity
            onPress={login}
            style={{
              ...styles.button,
              backgroundColor: "royalblue",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signup}
            color={"black"}
            style={styles.button}
          >
            <Text>Signup</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: windowWidth,
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
    borderRadius: 17,
    marginBottom: 20,
    textAlign: "left",
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
