import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Colors from "../Constants/Colors";

export default function SettingsScreen({ setTokenAndId }) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <Text>SettingsScreen</Text>
        <Pressable
          onPress={() => setTokenAndId(null, null)}
          style={styles.containerBtn}
        >
          <Text style={styles.textBtn}>Log out</Text>
        </Pressable>
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
  containerBtn: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "red",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textBtn: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
});
