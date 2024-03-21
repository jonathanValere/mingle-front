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

// import components --
import LayoutAuthentication from "./LayoutAuthentication";

import Colors from "../../Constants/Colors";

export default function SignupScreen({ setTokenAndId }) {
  const apiUrl = process.env.EXPO_PUBLIC_BACKEND; // Environment variable

  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      setError("Missing parameters");
    } else {
      try {
        const { data } = await axios.post(`${apiUrl}/signup`, {
          username,
          email,
          password,
        });

        if (data.token && data._id) {
          setTokenAndId(data.token, data._id);
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
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Pressable onPress={handleSubmit} style={styles.containerBtn}>
          <Text style={styles.btnTextToSignup}>Créer un compte</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.btnTextLogin}>J'ai déjà un compte</Text>
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
