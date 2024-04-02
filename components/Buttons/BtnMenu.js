import { View, Pressable, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function BtnMenu({ toggleMenu }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={toggleMenu} style={styles.btnMenu}>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color="black"
          style={styles.iconMenu}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnMenu: {
    marginRight: 15,
  },
  iconMenu: {
    padding: 4,
  },
});
