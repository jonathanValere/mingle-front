import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

import Colors from "../../Constants/Colors";

// Import des composants ---
import ModalCustom from "../../components/Modal/ModalCustom";
import Overview from "../../components/Overview/Overview";
import LayoutScreen from "../LayoutScreen";
import Meet from "../../components/Meet/Meet";

export default function HomeScreen({ userId, userToken }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [meet, setMeet] = useState([]);
  const [numAlumnis, setNumAlumnis] = useState(0);

  const currentDate = new Date().getHours(); // aide pour le greetings

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/teacher/${userId}`);

        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchMeet = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/meets`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        // Checking meet --
        if (data) {
          setMeet(data.at(-1));
          setNumAlumnis(data.at(-1).meet_students.length);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
    fetchMeet();
  }, [userId]);

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.primary}
      style={styles.activity}
    />
  ) : (
    <LayoutScreen>
      <ModalCustom
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
      <Text style={styles.greetings}>
        {currentDate > 12 ? "Bonsoir" : "Bonjour"} {userData.account?.username}{" "}
        !
      </Text>
      <Overview setIsVisibleModal={setIsVisibleModal} />
      <Text style={styles.sessionTitle}>Dernière session de mentorat</Text>
      <Meet
        title={meet.meet_title}
        numAlumnis={numAlumnis}
        time={meet.meet_time}
        idMeet={meet._id}
        userToken={userToken}
      />
    </LayoutScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  containerContent: {
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
  sessionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
});
