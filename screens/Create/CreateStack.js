import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screen (components) --
import ChoiceScreen from "./ChoiceScreen";
import CreateSessionScreen from "./CreateSessionScreen";
import CreateStudentScreen from "./CreateStudentScreen";

// import components --
import BackButton from "../../components/Buttons/BackButton";

import Colors from "../../Constants/Colors";

const Stack = createNativeStackNavigator();

export default function CreateStack({ userToken }) {
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
        options={{
          headerShown: true,
          headerTitle: "Créer une session",
        }}
      >
        {(props) => <CreateSessionScreen userToken={userToken} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="createStudent"
        component={CreateStudentScreen}
        options={{
          headerShown: true,
          headerTitle: "Créer un(e) apprenant(e)",
        }}
      />
    </Stack.Navigator>
  );
}
