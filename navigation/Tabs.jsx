import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screens/Home";
import Students from "../screens/Students";
import Calendar from "../screens/CalendarPage";
import { TouchableOpacity } from "react-native";
import { useAppContext } from "../context/appContext";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { modalVisible, setModalVisible } = useAppContext();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => setModalVisible(true)}
            >
              <AntDesign name="pluscircle" size={24} color="royalblue" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Students"
        component={Students}
        options={{
          tabBarLabel: "Students",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => setModalVisible(true)}
            >
              <AntDesign name="pluscircle" size={24} color="royalblue" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
