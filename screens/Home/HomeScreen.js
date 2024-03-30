import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Constants from "expo-constants";

import Colors from "../../Constants/Colors";

// Import des composants ---
import Header from "../../components/Header/Header";
import ModalCustom from "../../components/Modal/ModalCustom";
import Overview from "../../components/Overview/Overview";
import Meet from "../../components/Meet/Meet";

// import context --
import { DarkModeContext } from "../../store/Context/DarkModeContext";

export default function HomeScreen({ userId, userToken }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [meet, setMeet] = useState([]);
  const [numAlumnis, setNumAlumnis] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const currentDate = new Date().getHours(); // aide pour le greetings

  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const { data } = await axios.get(`${apiUrl}/teacher/${userId}`);

          if (data) {
            setUserData(data);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchMeet = async () => {
      try {
        if (userId) {
          const { data } = await axios.get(`${apiUrl}/meets`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          // Checking meet --
          if (data.length > 0) {
            const lastMeet = data.at(-1);
            setMeet(lastMeet);
            if (lastMeet.meet_students?.length !== 0) {
              setNumAlumnis(data.at(-1).meet_students.length);
            }
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? Colors.darkgrey : Colors.white,
        },
      ]}
    >
      <Header />
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <ModalCustom
          isVisibleModal={isVisibleModal}
          setIsVisibleModal={setIsVisibleModal}
        />
        <Text
          style={[
            styles.greetings,
            { color: darkMode ? Colors.white : Colors.darkgrey },
          ]}
        >
          {currentDate > 12 ? "Bonsoir" : "Bonjour"}{" "}
          {userData.account?.username} !
        </Text>

        <Overview setIsVisibleModal={setIsVisibleModal} />
        <Text
          style={[
            styles.sessionTitle,
            { color: darkMode ? Colors.white : Colors.darkgrey },
          ]}
        >
          Dernière session de mentorat
        </Text>
        {meet.meet_title ? (
          <Meet
            title={meet.meet_title}
            numAlumnis={numAlumnis}
            time={meet.meet_time}
            idMeet={meet._id}
            userToken={userToken}
          />
        ) : (
          <Text>No session yet</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
