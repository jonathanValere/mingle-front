import { View, StyleSheet, Pressable } from "react-native";
import Logo from "../Logo/Logo";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../Constants/Colors";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoAndMessage}>
        <Logo />
        <Pressable onPress={() => console.log("Go to MessagesScreen")}>
          <MaterialIcons name="message" size={32} color={Colors.primary} />
        </Pressable>
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
