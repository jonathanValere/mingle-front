import { createStackNavigator } from "@react-navigation/stack";

// Screens --
import SessionsScreen from "./SessionsScreen";
import SessionScreen from "../SessionScreen";

import Colors from "../../Constants/Colors";

import BackButton from "../../components/Buttons/BackButton";

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
      <Stack.Screen
        name="Session"
        options={{
          headerLeft: (props) => <BackButton {...props} />,
        }}
      >
        {(props) => <SessionScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
