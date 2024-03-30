import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { DarkModeContext } from "../../store/Context/DarkModeContext";

export default function ToggleDarkModeButton() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <Pressable onPress={toggleDarkMode} style={styles.container}>
      <Text>Toggle Mode</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "30%",
    padding: 10,
    margin: 15,
  },
});
