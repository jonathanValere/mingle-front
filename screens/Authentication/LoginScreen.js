import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

import LayoutAuthentication from "./LayoutAuthentication";

import Colors from "../../Constants/Colors";

export default function LoginScreen({ setTokenAndId }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Email or/and password missing");
    } else {
      try {
        const { data } = await axios.post(`${apiUrl}/login`, {
          email,
          password,
        });

        if (data.token && data._id) {
          setTokenAndId(data.token, data._id);
        } else {
          setError("An error occurred");
        }
      } catch (error) {
        setError("An error occurred");
      }
    }
  };

  return (
    <LayoutAuthentication>
      {error &&
        Alert.alert("Error", error, [
          { text: "OK", onPress: () => setError(null) },
        ])}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />

        <Pressable onPress={handleSubmit} style={styles.containerBtn}>
          <Text style={styles.btnTextToSignup}>Se connecter</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.btnTextLogin}>Je n'ai pas de compte</Text>
        </Pressable>
      </View>
    </LayoutAuthentication>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 50,
    gap: 20,
  },
  logo: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.white,
    width: "100%",
    height: 40,
    padding: 10,
    borderRadius: 4,
    color: Colors.primary,
  },
  containerBtn: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: 50,
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
  error: {
    color: Colors.redError,
    marginBottom: 20,
  },
});
