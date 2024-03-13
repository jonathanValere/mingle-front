import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Screens (component) ---
import HomeScreen from "./screens/HomeScreen";
import CreateScreen from "./screens/CreateScreen";
import AlumnisScreen from "./screens/AlumnisScreen";
import SessionsScreen from "./screens/SessionsScreen";
import SettingsScreen from "./screens/SettingsScreen";

import Colors from "./Constants/Colors";

// Import component --

const Tab = createBottomTabNavigator();
const iconTabStyle = {
  size: 22,
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.primary },
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: Colors.white,
          tabBarLabelStyle: {
            fontSize: 11,
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
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings"
                size={iconTabStyle.size}
                color={focused ? Colors.secondary : Colors.white}
              />
            ),
          }}
        />
      </Tab.Navigator>
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
