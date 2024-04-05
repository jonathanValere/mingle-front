import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { DarkModeContext } from "../../store/Context/DarkModeContext";

import Button from "../../components/Buttons/Button";

import Colors from "../../Constants/Colors";

export default function AlumniUpdateScreen({ navigation, route }) {
  const { darkMode } = useContext(DarkModeContext);
  const { idItem, userToken } = route.params;
  const apiURL = process.env.EXPO_PUBLIC_BACKEND;

  // State filed of form
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [information, setInformation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiURL}/student/${idItem}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (data) {
          setFirstname(data.student_firstname);
          setLastname(data.student_lastname);
          setInformation(data.student_information);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Submit ----
  const handleSubmit = async () => {
    try {
      if (firstname && lastname) {
        const { data } = await axios.put(
          `${apiURL}/student/${idItem}`,
          {
            student_firstname: firstname,
            student_lastname: lastname,
            student_information: information,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        Alert.alert(
          "Bravo !",
          `L'apprenant(e) "${firstname} ${lastname}" a bien été modifié(e)!`
        );
        navigation.navigate({
          name: "Alumni",
          params: { idStudent: idItem, userToken },
        });
      } else {
        Alert.alert("Attention", "Le prénom et le nom sont obligatoires.");
      }
    } catch (error) {
      console.log("AlumniUpdate error >>>", error);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: darkMode ? Colors.darkgrey : Colors.white },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.form}>
        <View style={styles.section}>
          <Text
            style={[
              styles.label,
              { color: darkMode ? Colors.white : Colors.darkgrey },
            ]}
          >
            Prénom<Text style={styles.labelRequired}>*</Text>
          </Text>
          <TextInput
            value={firstname}
            onChangeText={setFirstname}
            style={[styles.input]}
            placeholder="Entrez votre prénom"
          />
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.label,
              { color: darkMode ? Colors.white : Colors.darkgrey },
            ]}
          >
            Nom<Text style={styles.labelRequired}>*</Text>
          </Text>
          <TextInput
            value={lastname}
            onChangeText={setLastname}
            style={[styles.input]}
            placeholder="Entrez votre nom"
          />
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.label,
              { color: darkMode ? Colors.white : Colors.darkgrey },
            ]}
          >
            Informations
          </Text>
          <TextInput
            value={information}
            onChangeText={setInformation}
            style={[styles.input, styles.textArea]}
            placeholder="Entrez des informations sur l'apprenant"
            multiline={true}
          />
        </View>
        <Button
          label="Créer l'apprenant(e)"
          bgColor={Colors.blueDark}
          txtColor={Colors.white}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    margin: 10,
  },
  section: {
    marginVertical: 5,
  },
  label: {
    marginVertical: 10,
    fontSize: Platform.OS === "android" ? 16 : 14,
  },
  input: {
    backgroundColor: Colors.greyLight,
    paddingHorizontal: 10,
    height: 40,
  },
  labelRequired: {
    color: Colors.redError,
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
});
