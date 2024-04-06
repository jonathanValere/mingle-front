import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../../Constants/Colors";
import Button from "../Buttons/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NotFound({ texte, btnLabel }) {
  const navigation = useNavigation();
  const route = useRoute();

  const handleGoScreenAddNewItem = () => {
    navigation.navigate("Create", {
      screen: "choice",
    });
  };

  return (
    <View style={styles.container}>
      <Text>{texte}</Text>
      <Button
        label={btnLabel}
        bgColor={Colors.blueDark}
        txtColor={Colors.white}
        onPress={handleGoScreenAddNewItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
