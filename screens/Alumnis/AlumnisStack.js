import { Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens --
import AlumnisScreen from "./AlumnisScreen";
import AlumniScreen from "./AlumniScreen";
import AlumniUpdateScreen from "./AlumniUpdateScreen";
import BtnMenu from "../../components/Buttons/BtnMenu";

import Colors from "../../Constants/Colors";

const Stack = createStackNavigator();

export default function AlumnisStack({ userToken }) {
  return (
    <Stack.Navigator
      id="Alumnis"
      screenOptions={{
        cardStyle: { backgroundColor: Colors.white },
        headerStyle: { backgroundColor: Colors.third },
        headerTitleStyle: { fontSize: 16 },
      }}
    >
      <Stack.Screen name="AlumnisStack" options={{ headerShown: false }}>
        {(props) => <AlumnisScreen userToken={userToken} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Alumni"
        options={() => ({
          title: "Fiche de l'apprenant(e)",
          headerRight: () => <BtnMenu />, // Placeholder pour éviter le scintillement, peut être omis.
        })}
      >
        {(props) => <AlumniScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="AlumniUpdate"
        options={{ title: "Modifier la fiche apprenant" }}
      >
        {(props) => <AlumniUpdateScreen userToken={userToken} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
