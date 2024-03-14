import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Constants from "expo-constants";

import Colors from "../Constants/Colors";
import Header from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greetings}>Bonjour [username]!</Text>
        <Pressable onPress={() => console.log("Go to OverviewScreen")}>
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
  },
  overviewBlocText: {
    width: "60%",
  },
  overviewTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overviewText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 18,
  },
});
