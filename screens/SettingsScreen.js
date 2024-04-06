import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../Constants/Colors";

// Import context --
import { DarkModeContext } from "../store/Context/DarkModeContext";
import Button from "../components/Buttons/Button";

export default function SettingsScreen({ setTokenAndId }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.containerContent,
          { backgroundColor: darkMode ? Colors.darkgrey : Colors.white },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Mode</Text>
          <Pressable style={styles.itemBtn} onPress={toggleDarkMode}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color="black"
            />
            <Text>{darkMode ? "Light" : "Dark"}</Text>
          </Pressable>
        </View>
        <Button
          label="Se déconnecter"
          bgColor={Colors.redError}
          txtColor={Colors.white}
          onPress={() => setTokenAndId(null, null)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  containerContent: {
    padding: 10,
    flex: 1,
  },
  item: {
    backgroundColor: Colors.greyLight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  itemTitle: {
    fontWeight: "bold",
  },
  itemBtn: {
    backgroundColor: Colors.blueDark,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "25%",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
