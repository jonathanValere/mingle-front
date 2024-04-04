import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

// Import Context ---
import { DarkModeContext } from "../../store/Context/DarkModeContext";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";

// Components ---
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Buttons/Button";

export default function SessionUpdateScreen({ navigation, userToken, route }) {
  const { darkMode } = useContext(DarkModeContext);
  const { idItem } = route.params;
  const apiURL = process.env.EXPO_PUBLIC_BACKEND;

  // State filed of form
  const [title, setTitle] = useState(null);
  const [mode, setMode] = useState();
  const [time, setTime] = useState("0");
  const [actions, setActions] = useState([]);
  const [itemAction, setItemAction] = useState("");
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get datas about meet --
        const { data } = await axios.get(`${apiURL}/meet/${idItem}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (data) {
          setTitle(data.meet_title);
          setMode(data.meet_mode);
          setTime(String(data.meet_time));
          setActions(data.meet_actions);
          setComments(data.meet_comments);
        }
      } catch (error) {
        console.log("error >>>", error);
      }
    };
    fetchData();
  }, []);

  // Handle Actions ---
  const handleAddAction = (item) => {
    if (item) {
      setActions([...actions, item]);
      setItemAction("");
    }
  };

  const handleRemoveAction = (item) => {
    if (item) {
      const copyActionsAndFilter = [...actions].filter(
        (itemFilt) => itemFilt !== item
      );
      setActions(copyActionsAndFilter);
    }
  };
  // ----------------------

  // Submit ----
  const handleSubmit = async () => {
    try {
      if (title) {
        const { data } = await axios.put(
          `${apiURL}/meet/${idItem}`,
          {
            title,
            mode,
            time,
            actions,
            comments,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        navigation.navigate("Session", { idMeet: idItem, userToken });

        Alert.alert(
          "Bravo !",
          `La session "${data.meet_title}" a bien été modifiée!`
        );
      } else {
        Alert.alert("Attention", "Le titre de la session est obligatoire.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // --------------------------

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
            Titre de la session<Text style={styles.labelRequired}>*</Text>
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[styles.input]}
            placeholder="Entrez votre titre"
          />
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.label,
              { color: darkMode ? Colors.white : Colors.darkgrey },
            ]}
          >
            Mode d'accompagnement
          </Text>
          <Dropdown setMode={setMode} />
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.label,
              { color: darkMode ? Colors.white : Colors.darkgrey },
            ]}
          >
            Durée de la session (en minutes)
          </Text>
          <TextInput
            value={time}
            onChangeText={setTime}
            style={[styles.input]}
            placeholder="Indiquez la durée"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.label,
              { color: darkMode ? Colors.white : Colors.darkgrey },
            ]}
          >
            Actions
          </Text>
          {actions.map((item, index) => {
            return (
              <View key={index} style={styles.itemActionStyle}>
                <Text style={styles.textAction}>{item}</Text>
                <Pressable onPress={() => handleRemoveAction(item)}>
                  <AntDesign name="minussquare" size={25} color="black" />
                </Pressable>
              </View>
            );
          })}
          <View style={styles.actionsItem}>
            <TextInput
              value={itemAction}
              onChangeText={setItemAction}
              style={[styles.input, styles.inputActions]}
              placeholder="Indiquez une action"
            />
            <Pressable onPress={() => handleAddAction(itemAction)}>
              <AntDesign
                name="plussquare"
                size={44}
                color={darkMode ? Colors.white : Colors.primary}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.label,
              { color: darkMode ? Colors.white : Colors.darkgrey },
            ]}
          >
            Commentaires
          </Text>
          <TextInput
            value={comments}
            onChangeText={setComments}
            style={[styles.input, styles.textArea]}
            placeholder="Mettez des commentaires"
            multiline={true}
          />
        </View>
        <Button
          onPress={handleSubmit}
          label="Modifier la session"
          bgColor={Colors.secondary}
          txtColor={Colors.white}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {},
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
  formSubmit: {
    backgroundColor: Colors.primary,
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  formSubmitText: {
    color: Colors.white,
  },
  inputActions: {
    flex: 1,
  },
  actionsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  itemActionStyle: {
    marginVertical: 2,
    backgroundColor: Colors.third,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textAction: {
    fontSize: 16,
  },
});
