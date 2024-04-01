import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

import Colors from "../../Constants/Colors";

// Components --
import Header from "../../components/Header/Header";
import Student from "../../components/Student/Student";

export default function AlumnisScreen({ userToken }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/students`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (data) {
          setStudentList(data.reverse());
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response?.data.message);
      }
    };

    fetchData();
  }, [studentList]);

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.primary}
      style={styles.activity}
    />
  ) : (
    <View style={styles.container}>
      <Header />
      {studentList.length === 0 ? (
        <Text>No student found</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.containerContent}
          showsVerticalScrollIndicator={false}
          data={studentList}
          renderItem={({ item }) => (
            <Student
              firstname={item.student_firstname}
              lastname={item.student_lastname}
              idStudent={item._id}
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
