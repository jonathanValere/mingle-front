import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

import Colors from "../Constants/Colors";

// Import des composants ---
import Header from "../components/Header/Header";
import ModalCustom from "../components/Modal/ModalCustom";
import Overview from "../components/Overview/Overview";

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const currentDate = new Date().getHours(); // aide pour le greetings

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <ModalCustom
          isVisibleModal={isVisibleModal}
          setIsVisibleModal={setIsVisibleModal}
        />
        <Text style={styles.greetings}>
          {currentDate > 12 ? "Bonsoir" : "Bonjour"} [username]!
        </Text>
        <Overview setIsVisibleModal={setIsVisibleModal} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  containerContent: {
    backgroundColor: Colors.greyLight,
    padding: 10,
  },
  greetings: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
