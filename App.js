import { StyleSheet } from "react-native";
import Stack from "./navigation/Stack";

export default function App() {
  return <Stack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
