import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

import Colors from "../Constants/Colors";

import Header from "../components/Header/Header";

import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <Modal
          visible={isVisibleModal}
          animationType="slide"
          onRequestClose={() => setIsVisibleModal(false)}
          transparent={true}
        >
          <View style={styles.containerModal}>
            <View style={styles.modalView}>
              <View style={styles.containerCloseBtn}>
                <Pressable
                  onPress={() => setIsVisibleModal(false)}
                  style={styles.btnClose}
                >
                  <AntDesign
                    name="closecircle"
                    size={25}
                    color={Colors.primary}
                  />
                </Pressable>
              </View>
              <ScrollView contentContainerStyle={styles.containerTextModal}>
                <View>
                  <Text style={styles.titleModal}>[Title]</Text>
                  <Text style={styles.textModal}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Illo nam facilis numquam rem officia laudantium quis quas
                    dolorem voluptatem qui dolores ipsa voluptate blanditiis
                    esse enim dolore, dignissimos, veniam magni.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Text style={styles.greetings}>Bonjour [username]!</Text>
        <Pressable onPress={() => setIsVisibleModal(true)}>
          <View style={styles.overview}>
            <Image
              source={require("../assets/img/illustration_overview.png")}
            />
            <View style={styles.overviewBlocText}>
              <Text style={styles.overviewTitle}>Bienvenue sur Mingle!</Text>
              <Text style={styles.overviewText}>
                L’application vous permettant de créer et gérer vos sessions de
                mentorat.
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
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
    backgroundColor: Colors.greyLight,
    padding: 10,
  },
  containerModal: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 100,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.5,
  },
  modalView: {
    backgroundColor: Colors.greyLight,
    width: "100%",
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  greetings: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  overview: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    borderRadius: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  overviewBlocText: {
    width: "60%",
  },
  overviewTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overviewText: {
    color: Colors.white,
    fontSize: 13,
    lineHeight: 17,
  },
  containerCloseBtn: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  btnClose: {
    width: "10%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerTextModal: {
    marginTop: 15,
  },
  titleModal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 14,
  },
  textModal: {
    lineHeight: 18,
    fontSize: 14,
  },
});
