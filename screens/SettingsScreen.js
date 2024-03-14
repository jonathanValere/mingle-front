import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../Constants/Colors";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <Text>SettingsScreen</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  containerContent: {
    backgroundColor: Colors.greyLight,
    padding: 10,
  },
});
