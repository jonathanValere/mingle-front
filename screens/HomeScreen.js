import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

import Colors from "../Constants/Colors";

// Import des composants ---
import Header from "../components/Header/Header";
import ModalCustom from "../components/Modal/ModalCustom";
import Overview from "../components/Overview/Overview";

export default function HomeScreen({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const currentDate = new Date().getHours(); // aide pour le greetings

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/teacher/${userId}`
        );

        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [userId]);

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.primary}
      style={styles.activity}
    />
  ) : (
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
          {currentDate > 12 ? "Bonsoir" : "Bonjour"}{" "}
          {userData.account?.username} !
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
  activity: {
    flex: 1,
  },
});
