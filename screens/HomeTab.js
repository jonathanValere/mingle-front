import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Icons --
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Import components --

import Colors from "../Constants/Colors";

// Import Stack --
import HomeStack from "./Home/HomeStack";
import AlumnisStack from "./Alumnis/AlumnisStack";
import SessionsStack from "./Sessions/SessionsStack";
import CreateStack from "./Create/CreateStack";

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
        name="Create"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="add-box"
                size={30}
                color={focused ? Colors.secondary : Colors.white}
              />
            );
          },
        }}
      >
        {(props) => <CreateStack userToken={userToken} {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Alumnis"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-alt"
              size={iconTabStyle.size}
              color={focused ? Colors.secondary : Colors.white}
            />
          ),
        }}
      >
        {(props) => <AlumnisStack userToken={userToken} {...props} />}
      </Tab.Screen>

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
    </Tab.Navigator>
  );
}
