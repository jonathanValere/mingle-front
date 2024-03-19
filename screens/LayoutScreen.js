import { View, ScrollView, StyleSheet } from "react-native";
import Constants from "expo-constants";

import Colors from "../Constants/Colors";
import Header from "../components/Header/Header";

export default function ({ children }) {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        {children}
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
    padding: 10,
  },
});
