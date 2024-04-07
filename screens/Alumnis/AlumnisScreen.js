import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";

import Colors from "../../Constants/Colors";

// Components --
import Header from "../../components/Header/Header";
import NotFound from "../../components/NotFound/NotFound";
import TitleScreen from "../../components/Title/TitleScreen";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListItems from "../../components/List/ListItems";

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

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.primary}
      style={styles.activity}
    />
  ) : (
    <View style={styles.container}>
      <Header />
      <TitleScreen title="Liste des apprenants" />
      {studentList.length === 0 ? (
        <NotFound
          texte="Vous n'avez aucun apprenant"
          btnLabel="Créer un(e) apprenant(e)"
        />
      ) : (
        <>
          <SearchBar
            placeholder="Chercher un(e) apprenant(e)"
            itemSearch={itemSearch}
            setItemSearch={setItemSearch}
          />
          <ListItems
            itemSearch={itemSearch}
            list={studentList}
            userToken={userToken}
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
  activity: {
    flex: 1,
  },
});
