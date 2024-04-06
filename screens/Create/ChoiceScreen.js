import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import Constants from "expo-constants";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Header from "../../components/Header/Header";

import Colors from "../../Constants/Colors";

import { useContext } from "react";
import { DarkModeContext } from "../../store/Context/DarkModeContext";
import TitleScreen from "../../components/Title/TitleScreen";

export default function ChoiceScreen({ navigation }) {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? Colors.darkgrey : Colors.white },
      ]}
    >
      <Header />
      <View style={styles.contentBloc}>
        <Text
          style={[
            styles.title,
            { color: darkMode ? Colors.white : Colors.darkgrey },
          ]}
        >
          Que souhaites-tu faire ?
        </Text>
        <View style={styles.contentBtn}>
          <Pressable
            style={styles.btn}
            onPress={() =>
              navigation.navigate("createSession", { userId: 12345 })
            }
          >
            <Entypo name="add-to-list" size={40} color={Colors.white} />
            <Text style={styles.text}>Créer une session</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: Colors.blueDark }]}
            onPress={() => navigation.navigate("createStudent")}
          >
            <AntDesign name="adduser" size={40} color={Colors.white} />
            <Text style={styles.text}>Créer un(e) apprenant(e)</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  contentBloc: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  contentBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.primary,
    width: "50%",
    height: 120,
    padding: 10,
    borderRadius: 6,
  },
  text: {
    color: Colors.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: Platform.OS === "ios" ? 12 : 15,
    textAlign: "center",
  },
});
