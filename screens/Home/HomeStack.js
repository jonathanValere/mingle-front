import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SessionScreen from "../SessionScreen";

// Import component --
import BackButton from "../../components/Buttons/BackButton";

const Stack = createNativeStackNavigator();

export default function HomeStack({ userId, userToken }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => {
          return (
            <HomeScreen userId={userId} userToken={userToken} {...props} />
          );
        }}
      </Stack.Screen>
      <Stack.Screen
        name="Session"
        options={{
          headerShown: true,
          headerLeft: (props) => <BackButton {...props} />,
        }}
      >
        {(props) => <SessionScreen userId={userId} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
