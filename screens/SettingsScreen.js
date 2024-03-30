import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../Constants/Colors";

// Import context --
import { DarkModeContext } from "../store/Context/DarkModeContext";

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
            {darkMode ? (
              <Entypo name="light-down" size={24} color="black" />
            ) : (
              <MaterialIcons name="dark-mode" size={24} color="black" />
            )}

            <Text>{darkMode ? "Light" : "Dark"}</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => setTokenAndId(null, null)}
          style={styles.containerBtn}
        >
          <Text style={styles.textBtn}>Se déconnecter</Text>
        </Pressable>
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
  containerBtn: {
    borderRadius: 4,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#f28482",
  },
  textBtn: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold",
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
