import { Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../Constants/Colors";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.btn}>
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={24}
        color={Colors.primary}
      />
      <Text style={styles.text}>Retour</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  text: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: "bold",
  },
});
