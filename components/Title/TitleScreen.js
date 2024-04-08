import { View, Text, StyleSheet } from "react-native";
import { DarkModeContext } from "../../store/Context/DarkModeContext";
import { useContext } from "react";
import Colors from "../../Constants/Colors";

export default function TitleScreen({ title }) {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <View style={styles.titleContainer}>
      <Text
        style={[
          styles.title,
          { color: darkMode ? Colors.white : Colors.darkgrey },
        ]}
      >
        {title}
      </Text>
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
