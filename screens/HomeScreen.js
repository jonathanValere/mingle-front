import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

import Colors from "../Constants/Colors";
import Header from "../components/Header/Header";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <Text>Bonjour [username]</Text>
        <Text>HomeScreen</Text>
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
});
