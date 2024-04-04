import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

// package Gestion date --
import moment from "moment";
import "moment/locale/fr";

import Colors from "../../Constants/Colors";
import BtnMenu from "../../components/Buttons/BtnMenu";
import Menu from "../../components/Menu/Menu";
import { useNavigation } from "@react-navigation/native";

export default function AlumniScreen({ route }) {
  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const { idStudent, userToken } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [dataStudent, setDataStudent] = useState({});
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/student/${idStudent}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (data) {
          setDataStudent(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("ERROR an alumni >>>", error.message);
      }
    };

    fetchData();
  }, []);

  // Handler toggle Menu on headerRight ---
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BtnMenu toggleMenu={() => setIsVisibleMenu(!isVisibleMenu)} />
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
      {isVisibleMenu && <Menu idItem={idStudent} userToken={userToken} />}
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.containerScrollView}
      >
        <Text style={styles.title}>
          {dataStudent.student_firstname} {dataStudent.student_lastname}
        </Text>
        <View style={styles.bloc}>
          <Text style={styles.section}>Informations</Text>
          <Text>{dataStudent.student_information}</Text>
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
