import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

// package Gestion date --
import moment from "moment";
import "moment/locale/fr";

import Colors from "../Constants/Colors";
import BtnMenu from "../components/Buttons/BtnMenu";
import Menu from "../components/Menu/Menu";

export default function SessionScreen({ route, navigation }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable
  const { idMeet, userToken } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [dataMeet, setDataMeet] = useState({});
  const [dateMeet, setDateMeet] = useState("");
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  // Permet de lancer la requête à chaque fois qu'on est focus sur l'écran --
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          // Initialise à zéro ---
          setIsVisibleMenu(false);
          // Lancer la requête --
          const { data } = await axios.get(`${apiUrl}/meet/${idMeet}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          if (data) {
            setDataMeet(data);
            const dateInitial = new Date(data.createdAt);
            setDateMeet(moment(dateInitial).format("dddd Do MMMM YYYY"));
            setIsLoading(false);
          }
        } catch (error) {
          console.log("error a Session >>>", error.message);
        }
      };

      fetchData();
    }, [])
  );

  // Gestion du menu --
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BtnMenu
          toggleMenu={() => {
            setIsVisibleMenu(!isVisibleMenu);
          }}
        />
      ),
    });
  }, [isVisibleMenu]);

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.primary}
      style={styles.activity}
    />
  ) : (
    <>
      {isVisibleMenu && <Menu idItem={idMeet} userToken={userToken} />}
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.containerScrollView}
      >
        <Text style={styles.title}>{dataMeet.meet_title}</Text>
        <View style={styles.bloc}>
          <Text style={styles.section}>Date de la séance</Text>
          <Text>{dateMeet}</Text>
        </View>
        <View style={styles.bloc}>
          <Text style={styles.section}>Durée de la séance</Text>
          <Text>{dataMeet.meet_time ? dataMeet.meet_time : "0"} minute(s)</Text>
        </View>

        <View style={styles.bloc}>
          <Text style={styles.section}>Participants</Text>
          {dataMeet.meet_students.length === 0 ? (
            <Text>Aucun participant</Text>
          ) : (
            dataMeet.meet_students.map((item) => (
              <Text key={item} style={styles.student}>
                {item}
              </Text>
            ))
          )}
        </View>
        <View style={styles.bloc}>
          <Text style={styles.section}>Mode d'accompagnement</Text>
          <Text>{dataMeet.meet_mode}</Text>
        </View>
        <View style={styles.bloc}>
          <Text style={styles.section}>Champs d'actions</Text>
          {dataMeet.meet_actions.map((item) => (
            <Text key={item}>{item}</Text>
          ))}
        </View>
        <View style={styles.bloc}>
          <Text style={styles.section}>Commentaires</Text>
          <Text>{dataMeet.meet_comments}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: Colors.white,
    flex: 1,
  },
  containerScrollView: {
    flex: 1,
  },
  activity: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  bloc: {
    backgroundColor: Colors.greyLight,
    marginVertical: 5,
    padding: 15,
    borderRadius: 5,
  },
  section: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
  },
  student: {
    backgroundColor: Colors.blueDark,
    maxWidth: "min-content",
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    color: Colors.white,
  },
  menu: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: Colors.secondary,
    gap: 15,
    padding: 15,
    top: 0,
    right: 10,
    width: 150,
    minHeight: "auto",
    borderRadius: 5,
    overflow: "visible",
  },
});
