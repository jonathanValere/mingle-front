import { createStackNavigator } from "@react-navigation/stack";

// Screens --
import SessionsScreen from "./SessionsScreen";
import SessionScreen from "../SessionScreen";

import BackButton from "../../components/Buttons/BackButton";

const Stack = createStackNavigator();

export default function SessionsStack({ userToken }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SessionsStack">
        {(props) => <SessionsScreen userToken={userToken} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Session"
        options={{
          headerShown: true,
          headerLeft: (props) => <BackButton {...props} />,
        }}
      >
        {(props) => <SessionScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
