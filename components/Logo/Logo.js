import { View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LogoUrl = require("../../assets/img/logo.png");

export default function Logo() {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Image source={LogoUrl} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
