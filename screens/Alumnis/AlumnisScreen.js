import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useCallback, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

import Colors from "../../Constants/Colors";

// Components --
import Header from "../../components/Header/Header";
import Student from "../../components/Student/Student";

import { useFocusEffect } from "@react-navigation/native";
import NotFound from "../../components/NotFound/NotFound";

export default function AlumnisScreen({ userToken }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);

  useFocusEffect(
    useCallback(() => {
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
          console.log("ERROR all alumins >>>", error.response?.data.message);
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
      {studentList.length === 0 ? (
        <NotFound
          texte="Vous n'avez aucun apprenant"
          btnLabel="Créer un(e) apprenant(e)"
        />
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
