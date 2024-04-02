import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

// package Gestion date --
import moment from "moment";
import "moment/locale/fr";

import Colors from "../Constants/Colors";
import BtnMenu from "../components/Buttons/BtnMenu";

export default function SessionScreen({ route, navigation }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const { idMeet, userToken } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [dataMeet, setDataMeet] = useState({});
  const [dateMeet, setDateMeet] = useState("");
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    navigation.setOptions({
      headerRight: () => (
        <BtnMenu
          setIsVisibleMenu={setIsVisibleMenu}
          isVisibleMenu={isVisibleMenu}
        />
      ),
    });
    fetchData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BtnMenu toggleMenu={() => setIsVisibleMenu(!isVisibleMenu)} />
      ),
    });
  }, [isVisibleMenu]);

  const HandleRemoveMeet = async () => {
    try {
      // Alert message --
      Alert.alert(
        "Attention",
        "Etes-vous sûr(e) de vouloir supprimer la session ? Cette action est irreversible.",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Confirmer",
            onPress: async () => {
              // If confirm, remove meet
              try {
                const { data } = await axios.delete(
                  `${apiUrl}/meet/${idMeet}`,
                  {
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                    },
                  }
                );
                if (data) {
                  Alert.alert(
                    "Information",
                    `La session "${dataMeet.meet_title}" a bien été supprimée!`
                  );
                  setIsVisibleMenu(!isVisibleMenu);
                  navigation.popToTop();
                }
              } catch (error) {
                console.log(error);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.primary}
      style={styles.activity}
    />
  ) : (
    <>
      {isVisibleMenu && (
        <View style={styles.menu}>
          <Pressable
            onPress={() => {
              navigation.navigate("SessionUpdate", {
                idMeet,
              });
              setIsVisibleMenu(!isVisibleMenu);
            }}
          >
            <Text>Modifier</Text>
          </Pressable>
          <Pressable onPress={HandleRemoveMeet}>
            <Text>Supprimer</Text>
          </Pressable>
        </View>
      )}
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
