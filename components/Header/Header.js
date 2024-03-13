import { View, StyleSheet } from "react-native";
import Logo from "../Logo/Logo";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../Constants/Colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoAndMessage}>
        <Logo />
        <MaterialIcons name="message" size={32} color={Colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.greyLight,
    zIndex: 1,
  },
  logoAndMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
