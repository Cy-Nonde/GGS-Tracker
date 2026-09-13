// mobile/App.js
import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AuthScreen from "./components/AuthScreen";
import ChatBox from "./components/ChatBox";
import SettingsScreen from "./components/SettingsScreen";
import NotificationScreen from "./components/NotificationScreen";
import SplashScreen from "./components/SplashScreen";
import RecordScreen from "./components/RecordScreen";
import TimelineScreen from "./components/TimelineScreen";
import CollaboratorScreen from "./components/CollaboratorScreen";
import CommentScreen from "./components/CommentScreen";
import HistoryScreen from "./components/HistoryScreen";

// Contexts
export const ThemeContext = createContext();
export const AuthContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs with badge counters
function MainTabs({ notificationCount, clearNotifications }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatBox} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarBadge: notificationCount > 0 ? notificationCount : undefined,
        }}
        listeners={{
          tabPress: () => clearNotifications(), // reset badge when tab is opened
        }}
      />
    </Tab.Navigator>
  );
}

// Root stack navigator
function RootNavigator({ notificationCount, clearNotifications }) {
  const { authToken, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {authToken ? (
        <>
          <Stack.Screen
            name="Projects"
            options={{ headerShown: false }}
          >
            {() => (
              <MainTabs
                notificationCount={notificationCount}
                clearNotifications={clearNotifications}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Tasks" component={TimelineScreen} />
          <Stack.Screen name="Timeline" component={TimelineScreen} />
          <Stack.Screen name="Collaborators" component={CollaboratorScreen} />
          <Stack.Screen name="Comments" component={CommentScreen} />
          <Stack.Screen name="Records" component={RecordScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    (async () => {
      const savedUser = await AsyncStorage.getItem("USERNAME");
      const savedToken = await AsyncStorage.getItem("API_TOKEN");
      const savedTheme = await AsyncStorage.getItem("THEME");
      const savedCount = await AsyncStorage.getItem("NOTIFICATION_COUNT");

      if (savedUser && savedToken) {
        global.USERNAME = savedUser;
        global.API_TOKEN = savedToken;
        setAuthToken(savedToken);
      }
      if (savedTheme === "dark") setDarkMode(true);
      if (savedCount) setNotificationCount(parseInt(savedCount, 10));
      setLoading(false);
    })();
  }, []);

  // 🔑 Reset session helper
  const resetSession = () => {
    global.USERNAME = null;
    global.API_TOKEN = null;
    setAuthToken(null);
  };

  // 🔔 Clear badge when Notifications tab is opened
  const clearNotifications = () => {
    setNotificationCount(0);
    AsyncStorage.setItem("NOTIFICATION_COUNT", "0");
  };

  return (
    <AuthContext.Provider value={{ authToken, loading }}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode, resetSession }}>
        <NavigationContainer>
          <RootNavigator
            notificationCount={notificationCount}
            clearNotifications={clearNotifications}
          />
        </NavigationContainer>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
