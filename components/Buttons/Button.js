import { Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../Constants/Colors";

export default function Button({ onPress, label, bgColor, txtColor }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, { backgroundColor: bgColor }]}
    >
      <Text style={[styles.btnLabel, { color: txtColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    marginVertical: 5,
    padding: 15,
    borderRadius: 5,
  },
  btnLabel: {
    fontWeight: "bold",
  },
});
