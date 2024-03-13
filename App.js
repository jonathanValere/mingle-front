import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Colors from "./Constants/Colors";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Mingle!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.white,
  },
});
