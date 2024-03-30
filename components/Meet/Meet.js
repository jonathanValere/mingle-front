import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../Constants/Colors";

export default function Meet({ idMeet, userToken, title, time, numAlumnis }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Session", { idMeet, userToken })}
    >
      <View style={styles.sessionContainer}>
        <View style={styles.sessionBlocInfoAndDate}>
          <Text style={styles.sessionDate}>Sujet : {title}</Text>
          <View style={styles.sessionBlocInfo}>
            <View style={styles.sessionInfo}>
              <FontAwesome name="users" size={20} color="black" />
              <Text style={styles.sessionInfo}>{numAlumnis} Alumni(s)</Text>
            </View>
            <View style={styles.sessionInfo}>
              <Ionicons name="time" size={20} color="black" />
              <Text>{time} minute(s)</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sessionContainer: {
    marginVertical: 10,
  },
  sessionBlocInfoAndDate: {
    backgroundColor: Colors.greyLight,
    padding: 15,
    borderRadius: 5,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  sessionBlocInfo: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  sessionInfo: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
