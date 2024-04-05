import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import Colors from "../../Constants/Colors";

export default function Menu({ userToken, idItem }) {
  const navigation = useNavigation();
  const route = useRoute();
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  // Handler Remove meet ---
  const HandleRemove = async () => {
    try {
      // Alert message --
      Alert.alert(
        "Attention",
        "Etes-vous sûr(e) de vouloir supprimer la fiche ? Cette action est irreversible.",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Confirmer",
            onPress: async () => {
              // If confirm, remove
              try {
                const { data } = await axios.delete(
                  route.name === "Alumni"
                    ? `${apiUrl}/student/${idItem}`
                    : `${apiUrl}/meet/${idItem}`,
                  {
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                    },
                  }
                );
                // Get a succes message --
                Alert.alert(
                  "Information",
                  route.name === "Alumni"
                    ? `La fiche "${data.data.student_firstname} ${data.data.student_lastname}" a bien été supprimée!`
                    : `La fiche "${data.data.meet_title}" a bien été supprimée!`
                );
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name:
                        route.name === "Alumni"
                          ? "AlumnisStack"
                          : "SessionsStack",
                    },
                  ],
                });
              } catch (error) {
                console.log("error menu >>>", error);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.menu}>
      <Pressable
        onPress={() => {
          navigation.navigate(
            route.name === "Alumni" ? "AlumniUpdate" : "SessionUpdate",
            {
              idItem,
              userToken,
            }
          );
        }}
      >
        <Text>Modifier</Text>
      </Pressable>
      <Pressable onPress={HandleRemove}>
        <Text>Supprimer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: Colors.blueDark,
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
