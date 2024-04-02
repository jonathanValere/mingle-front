import { createStackNavigator } from "@react-navigation/stack";
// Screens --
import SessionsScreen from "./SessionsScreen";
import SessionScreen from "../SessionScreen";

import Colors from "../../Constants/Colors";
import SessionUpdateScreen from "./SessionUpdateScreen";
import BtnMenu from "../../components/Buttons/BtnMenu";

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
          title: "Fiche de la session",
          headerRight: () => <BtnMenu />,
        }}
      >
        {(props) => <SessionScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="SessionUpdate"
        options={{ title: "Modifier la session" }}
      >
        {(props) => <SessionUpdateScreen userToken={userToken} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
