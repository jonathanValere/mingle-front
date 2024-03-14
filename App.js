import { StatusBar } from "expo-status-bar";
import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";
import {
  NavigationContainer,
  getStateFromPath,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Screens (component) ---
import HomeScreen from "./screens/HomeScreen";
import CreateScreen from "./screens/CreateScreen";
import AlumnisScreen from "./screens/AlumnisScreen";
import SessionsScreen from "./screens/SessionsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MessagesScreen from "./screens/Messages/MessagesScreen";

import Colors from "./Constants/Colors";
import BackButton from "./components/Buttons/BackButton";

// Import component --

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const iconTabStyle = {
  size: 20,
};

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.primary },
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.white,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="home"
                size={iconTabStyle.size}
                color={focused ? Colors.secondary : Colors.white}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="add-box"
                size={iconTabStyle.size}
                color={focused ? Colors.secondary : Colors.white}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Alumnis"
        component={AlumnisScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-alt"
              size={iconTabStyle.size}
              color={focused ? Colors.secondary : Colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="list"
              size={iconTabStyle.size}
              color={focused ? Colors.secondary : Colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="message"
              size={iconTabStyle.size}
              color={focused ? Colors.secondary : Colors.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MingleHome" component={Home} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            // headerBackTitle: "Retour",
            // headerBackTitleStyle: { fontSize: 16 },
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.white,
  },
});
