import { View, Text, StyleSheet } from "react-native";

export default function SessionScreen({ userId }) {
  return (
    <View>
      <Text>Session {userId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
