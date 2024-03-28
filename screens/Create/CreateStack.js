import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screen (components) --
import ChoiceScreen from "./ChoiceScreen";
import CreateSessionScreen from "./CreateSessionScreen";
import CreateStudentScreen from "./CreateStudentScreen";

// import components --
import BackButton from "../../components/Buttons/BackButton";

import Colors from "../../Constants/Colors";

const Stack = createNativeStackNavigator();

export default function CreateStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: Colors.third },
      }}
    >
      <Stack.Screen name="choice" component={ChoiceScreen} />
      <Stack.Screen
        name="createSession"
        component={CreateSessionScreen}
        options={{
          headerShown: true,
          headerTitle: "Créer une session",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="createStudent"
        component={CreateStudentScreen}
        options={{
          headerShown: true,
          headerTitle: "Créer un(e) apprenant(e)",
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack.Navigator>
  );
}
