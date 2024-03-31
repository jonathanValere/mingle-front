import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

// package Gestion date --
import moment from "moment";
import "moment/locale/fr";

import Colors from "../Constants/Colors";
import Button from "../components/Buttons/Button";

export default function SessionScreen({ route, navigation }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const { idMeet, userToken } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [dataMeet, setDataMeet] = useState({});
  const [dateMeet, setDateMeet] = useState("");

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

  const UpdateHandler = () => {
    navigation.navigate("SessionUpdate", { ...dataMeet, idMeet });
  };

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
        console.log(error.message);
      }
    };
    fetchData();
  }, [dataMeet]);

  return isLoading ? (
    <ActivityIndicator
      size={"large"}
      color={Colors.primary}
      style={styles.activity}
    />
  ) : (
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
      <Button
        onPress={UpdateHandler}
        label="Modifier"
        bgColor={Colors.secondary}
        txtColor={Colors.white}
      />
      <Button
        onPress={HandleRemoveMeet}
        label="Supprimer"
        bgColor={Colors.removeColor}
        txtColor={Colors.white}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: Colors.white,
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
});
