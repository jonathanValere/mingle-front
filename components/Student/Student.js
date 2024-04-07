import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../Constants/Colors";

export default function Student({ idStudent, userToken, firstname, lastname }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Alumni", { idStudent, userToken })}
    >
      <View style={styles.studentContainer}>
        <View style={styles.studentBlocInfo}>
          <Text style={styles.studentFullname}>
            {firstname} {lastname}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  studentContainer: {
    marginVertical: 10,
  },
  studentBlocInfo: {
    backgroundColor: Colors.greyLight,
    padding: 15,
    borderRadius: 5,
  },
  studentFullname: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.blueDark,
  },
});
