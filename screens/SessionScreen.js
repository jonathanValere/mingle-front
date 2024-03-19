import { View, Text, StyleSheet } from "react-native";

export default function SessionScreen({ route }) {
  const { idMeet } = route.params;
  return (
    <View>
      <Text>Session {idMeet}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
