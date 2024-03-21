import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Icons --
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Import components --
import HomeStack from "./Home/HomeStack";
import AlumnisScreen from "./Alumnis/AlumnisScreen";
import CreateScreen from "./CreateScreen";
import MessagesScreen from "./Messages/MessagesScreen";

import Colors from "../Constants/Colors";
import SessionsStack from "./Sessions/SessionsStack";

const Tab = createBottomTabNavigator();

const iconTabStyle = {
  size: 20,
};

export default function HomeTab({ userId, userToken }) {
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
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="home"
                size={25}
                color={focused ? Colors.secondary : Colors.white}
              />
            );
          },
        }}
      >
        {(props) => (
          <HomeStack userId={userId} userToken={userToken} {...props} />
        )}
      </Tab.Screen>

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
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="add-box"
                size={40}
                color={focused ? Colors.secondary : Colors.white}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Sessions"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="list"
              size={iconTabStyle.size}
              color={focused ? Colors.secondary : Colors.white}
            />
          ),
        }}
      >
        {(props) => <SessionsStack userToken={userToken} {...props} />}
      </Tab.Screen>
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
