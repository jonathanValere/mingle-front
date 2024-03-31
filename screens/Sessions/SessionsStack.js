import { Pressable, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

// Screens --
import SessionsScreen from "./SessionsScreen";
import SessionScreen from "../SessionScreen";

import Colors from "../../Constants/Colors";
import SessionUpdateScreen from "./SessionUpdateScreen";

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
          headerRight: () => (
            <Pressable onPress={() => console.log("affiche menu")}>
              <AntDesign name="ellipsis1" size={24} color="black" />
            </Pressable>
          ),
        }}
      >
        {(props) => <SessionScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SessionUpdate">
        {(props) => <SessionUpdateScreen userToken={userToken} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
