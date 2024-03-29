import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SessionScreen from "../SessionScreen";

import Colors from "../../Constants/Colors";

// Import component --
import BackButton from "../../components/Buttons/BackButton";

const Stack = createNativeStackNavigator();

export default function HomeStack({ userId, userToken }) {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.white },
        headerStyle: { backgroundColor: Colors.third },
        headerTitleStyle: { fontSize: 16 },
      }}
    >
      <Stack.Screen name="HomePage" options={{ headerShown: false }}>
        {(props) => {
          return (
            <HomeScreen userId={userId} userToken={userToken} {...props} />
          );
        }}
      </Stack.Screen>
      <Stack.Screen
        name="Session"
        options={{
          headerLeft: (props) => <BackButton {...props} />,
        }}
      >
        {(props) => <SessionScreen userId={userId} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
