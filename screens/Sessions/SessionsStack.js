import { createStackNavigator } from "@react-navigation/stack";

// Screens --
import SessionsScreen from "./SessionsScreen";
import SessionScreen from "../SessionScreen";

import Colors from "../../Constants/Colors";

const Stack = createStackNavigator();

export default function SessionsStack({ userToken }) {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.white },
        headerStyle: { backgroundColor: Colors.third },
        headerTitleStyle: { fontSize: 16 },
      }}
    >
      <Stack.Screen name="SessionsStack" options={{ headerShown: false }}>
        {(props) => <SessionsScreen userToken={userToken} {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Session">
        {(props) => <SessionScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
