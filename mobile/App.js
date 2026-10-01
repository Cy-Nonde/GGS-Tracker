// mobile/App.js
import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RecordScreen from "./components/RecordScreen";
import TimelineScreen from "./components/TimelineScreen";
import HistoryScreen from "./components/HistoryScreen";
import AuthScreen from "./components/AuthScreen";
import SplashScreen from "./components/SplashScreen";

// Contexts
export const ThemeContext = createContext();
export const AuthContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Records" component={RecordScreen} />
      <Tab.Screen name="Timeline" component={TimelineScreen} />
      <Tab.Screen name=“History” component={HistoryScreen} />
    </Tab.Navigator>
  );
}

// Root stack navigator
function RootNavigator() {
  const { authToken, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {authToken ? (
        <>
          <Stack.Screen
            name="SplashScreen"
            options={{ headerShown: false }}
          >
 (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const savedUser = await AsyncStorage.getItem("USERNAME");
      const savedToken = await AsyncStorage.getItem("API_TOKEN");

      if (savedUser && savedToken) {
        global.USERNAME = savedUser;
        global.API_TOKEN = savedToken;
        setAuthToken(savedToken);
      }
    })();
  }, []);

  // Reset session helper
  const resetSession = () => {
    global.USERNAME = null;
    global.API_TOKEN = null;
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, loading }}>
    </AuthContext.Provider>
  );
}