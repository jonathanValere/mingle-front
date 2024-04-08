import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import Constants from "expo-constants";

import Colors from "../../Constants/Colors";

import { DarkModeContext } from "../../store/Context/DarkModeContext";

// Components --
import Header from "../../components/Header/Header";
import NotFound from "../../components/NotFound/NotFound";
import TitleScreen from "../../components/Title/TitleScreen";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListItems from "../../components/List/ListItems";

export default function SessionsScreen({ userToken }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable
  const { darkMode } = useContext(DarkModeContext);

  const [isLoading, setIsLoading] = useState(true);
  const [listMeet, setListMeet] = useState([]);
  const [itemSearch, setItemSearch] = useState("");

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
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? Colors.darkgrey : Colors.white },
      ]}
    >
      <Header />
      <TitleScreen title="Liste des sessions" />
      {listMeet.length === 0 ? (
        <NotFound
          texte="Vous n'avez aucune session"
          btnLabel="Créer une session"
        />
      ) : (
        <>
          <SearchBar
            placeholder="Rechercher une session"
            itemSearch={itemSearch}
            setItemSearch={setItemSearch}
          />
          <ListItems
            itemSearch={itemSearch}
            list={listMeet}
            userToken={userToken}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  activity: {
    flex: 1,
  },
});
