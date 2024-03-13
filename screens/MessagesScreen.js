import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

import Header from "../components/Header/Header";
import Colors from "../Constants/Colors";

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <Text>MessagesScreen</Text>
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
