import "react-native-gesture-handler";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens (component) ---
import SignupScreen from "./screens/Authentication/SignupScreen";
import LoginScreen from "./screens/Authentication/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HomeTab from "./screens/HomeTab";

// Import component --
import BackButton from "./components/Buttons/BackButton";

import Colors from "./Constants/Colors";

import DarkModeProvider from "./store/Context/DarkModeContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // StatusBar.setBarStyle("light-content");

  // id and token handler --
  const setTokenAndId = async (token, id) => {
    if (token && id) {
      AsyncStorage.setItem("userToken", token);
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("userId");
    }
    setUserToken(token);
    setUserId(id);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      setUserToken(userToken);
      setUserId(userId);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <DarkModeProvider>
      <NavigationContainer>
        {isLoading ? null : userToken === null ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
              {() => <LoginScreen setTokenAndId={setTokenAndId} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {() => <SignupScreen setTokenAndId={setTokenAndId} />}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerStyle: { backgroundColor: Colors.third },
            }}
          >
            <Stack.Screen name="MingleHome">
              {(props) => (
                <HomeTab userId={userId} userToken={userToken} {...props} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Settings"
              options={{
                headerShown: true,
                headerTitle: "Paramètres",
              }}
            >
              {(props) => (
                <SettingsScreen setTokenAndId={setTokenAndId} {...props} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </DarkModeProvider>
  );
}
