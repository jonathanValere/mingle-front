import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../Constants/Colors";

export default function SignupScreen() {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/img/logo_authentification.png")}
          style={styles.logo}
        />
        <TextInput style={styles.input} placeholder="username" />
        <TextInput style={styles.input} placeholder="email" />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
        />
        <Pressable
          onPress={() => console.log("account created")}
          style={styles.containerBtn}
        >
          <Text style={styles.btnTextToSignup}>Créer un compte</Text>
        </Pressable>
        <Pressable onPress={() => console.log("go to login page")}>
          <Text style={styles.btnTextLogin}>J'ai déjà un compte</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    marginTop: "35%",
    gap: 20,
    backgroundColor: Colors.greyLight,
  },
  logo: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.white,
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 4,
    color: Colors.primary,
  },
  containerBtn: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 4,
  },
  btnTextToSignup: {
    color: Colors.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 13,
  },
  btnTextLogin: {
    color: Colors.secondary,
    fontWeight: "bold",
    fontSize: 12,
  },
});
