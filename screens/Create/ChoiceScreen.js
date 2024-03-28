import { View, Text, StyleSheet, Pressable } from "react-native";
import Header from "../../components/Header/Header";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../../Constants/Colors";

export default function ChoiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentBloc}>
        <Text style={styles.title}>Que souhaites-tu faire ?</Text>
        <View style={styles.contentBtn}>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate("createSession")}
          >
            <Entypo name="add-to-list" size={24} color={Colors.white} />
            <Text style={styles.text}>Créer une session</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate("createStudent")}
          >
            <AntDesign name="adduser" size={24} color={Colors.white} />
            <Text style={styles.text}>Créer un(e) apprenant(e)</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  contentBloc: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  contentBtn: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  btn: {
    backgroundColor: Colors.primary,
    width: "70%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 6,
    flexDirection: "row",
    marginVertical: 15,
  },
  text: {
    color: Colors.white,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
