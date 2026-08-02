//mobile/App.js
import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "./components/AuthScreen";
import ChatBox from "./components/ChatBox";
import SettingsScreen from "./components/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Theme context
export const ThemeContext = createContext();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatBox} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState("Auth");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      const savedUser = await AsyncStorage.getItem("USERNAME");
      const savedToken = await AsyncStorage.getItem("API_TOKEN");
      const savedTheme = await AsyncStorage.getItem("THEME");
      if (savedUser && savedToken) {
        global.USERNAME = savedUser;
        global.API_TOKEN = savedToken;
        setInitialRoute("Chat");
      }
      if (savedTheme === "dark") setDarkMode(true);
    })();
  }, []);

  // 🔑 Reset session helper
  const resetSession = () => {
    global.USERNAME = null;
    global.API_TOKEN = null;
    setInitialRoute("Auth"); // immediately reset navigation
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, resetSession }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={MainTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
