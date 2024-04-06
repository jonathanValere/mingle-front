import { View, Text, StyleSheet } from "react-native";

export default function TitleScreen({ title }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
