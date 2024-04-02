import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useCallback, useState } from "react";

import axios from "axios";
import Constants from "expo-constants";

import Colors from "../../Constants/Colors";

// Components --
import Header from "../../components/Header/Header";
import Meet from "../../components/Meet/Meet";
import { useFocusEffect } from "@react-navigation/native";

export default function SessionsScreen({ userToken, navigation }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const [isLoading, setIsLoading] = useState(true);
  const [listMeet, setListMeet] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${apiUrl}/meets`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          if (data) {
            setListMeet(data.reverse());
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error.response?.data.message);
        }
      };
      fetchData();
    }, [])
  );

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.primary}
      style={styles.activity}
    />
  ) : (
    <View style={styles.container}>
      <Header />
      {listMeet.length === 0 ? (
        <Text>No meet found</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.containerContent}
          showsVerticalScrollIndicator={false}
          data={listMeet}
          renderItem={({ item }) => (
            <Meet
              title={item.meet_title}
              numAlumnis={item.meet_students.length}
              time={item.meet_time ? item.meet_time : "1"}
              idMeet={item._id}
              userToken={userToken}
            />
          )}
        />
      )}
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
    backgroundColor: Colors.white,
    padding: 10,
  },
  activity: {
    flex: 1,
  },
});
