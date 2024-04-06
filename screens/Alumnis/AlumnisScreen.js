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
import TitleScreen from "../../components/Title/TitleScreen";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function AlumnisScreen({ userToken }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);
  const [itemSearch, setItemSearch] = useState("");

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

  // Handler searchBar ---
  const studentFilter = (itemSearch) => {
    // Create a copy --
    const listCopy = [...studentList];

    // Filter the list --
    const listFilter = listCopy.filter((item) => {
      // Concatene firstname and lastname
      const fullName = `${item.student_firstname} ${item.student_lastname}`;
      // search
      return (
        fullName.toLowerCase().includes(itemSearch.toLowerCase()) &&
        item.student_firstname
      );
    });
    return listFilter;
  };

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
        <>
          <TitleScreen title="Liste des apprenants" />
          <SearchBar
            placeholder="Chercher un(e) apprenant(e)"
            itemSearch={itemSearch}
            setItemSearch={setItemSearch}
          />
          <FlatList
            contentContainerStyle={styles.containerContent}
            showsVerticalScrollIndicator={false}
            data={studentFilter(itemSearch)}
            renderItem={({ item }) => (
              <Student
                firstname={item.student_firstname}
                lastname={item.student_lastname}
                idStudent={item._id}
                userToken={userToken}
              />
            )}
          />
        </>
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
