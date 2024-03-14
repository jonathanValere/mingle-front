import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import Colors from "../../Constants/Colors";

export default function Overview(props) {
  return (
    <Pressable onPress={() => props.setIsVisibleModal(true)}>
      <View style={styles.overview}>
        <Image source={require("../../assets/img/illustration_overview.png")} />
        <View style={styles.overviewBlocText}>
          <Text style={styles.overviewTitle}>Bienvenue sur Mingle!</Text>
          <Text style={styles.overviewText}>
            L’application vous permettant de créer et gérer vos sessions de
            mentorat.
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overview: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    borderRadius: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  overviewBlocText: {
    width: "60%",
  },
  overviewTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overviewText: {
    color: Colors.white,
    fontSize: 13,
    lineHeight: 17,
  },
});
