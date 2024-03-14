import { View, StyleSheet, Pressable } from "react-native";
import Logo from "../Logo/Logo";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../Constants/Colors";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoAndMessage}>
        <Logo />
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings" size={26} color={Colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
