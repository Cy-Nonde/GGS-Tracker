//mobile/components/SettingsScreen.js
import React, { useState, useContext } from "react";
import { View, TextInput, Button, Picker, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateMode, changePassword, clearHistory } from "../services/api";
import { ThemeContext } from "../App";

export default function SettingsScreen({ navigation }) {
  const [mode, setMode] = useState("default");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const { darkMode, setDarkMode, resetSession } = useContext(ThemeContext);
  const username = global.USERNAME || "guest";

  const handleSaveMode = async () => {
    const result = await updateMode(mode);
    alert(result.success ? "Mode preference saved!" : "Error: " + result.error);
  };

  const handleChangePassword = async () => {
    const result = await changePassword(oldPass, newPass);
    alert(result.success ? "Password updated!" : "Error: " + result.error);
    setOldPass("");
    setNewPass("");
  };

  const handleClearHistory = async () => {
    const success = await clearHistory(username);
    alert(success ? "History cleared!" : "Error clearing history");
  };

  const toggleTheme = async () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    await AsyncStorage.setItem("THEME", newTheme ? "dark" : "light");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("USERNAME");
    await AsyncStorage.removeItem("API_TOKEN");
    resetSession(); // reset App state immediately
    alert("Logged out successfully!");
    navigation.replace("Auth");
  };

  return (
    <>
      {/* Mode Preference */}
      <View style={styles.section}>
        <Picker selectedValue={mode} onValueChange={(val) => setMode(val)}>
          <Picker.Item label="Default" value="default" />
          <Picker.Item label="Study" value="study" />
          <Picker.Item label="Shopping" value="shopping" />
          <Picker.Item label="Productivity" value="productivity" />
        </Picker>
      </View>

      {/* Save Mode + Clear History in one row */}
      <View style={styles.row}>
        <View style={styles.flexButton}>
          <Button title="Save Mode" onPress={handleSaveMode} />
        </View>
        <View style={styles.flexButton}>
          <Button title="Clear History" onPress={handleClearHistory} />
        </View>
      </View>

      {/* Change Password */}
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          value={oldPass}
          onChangeText={setOldPass}
          placeholder="Old Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={newPass}
          onChangeText={setNewPass}
          placeholder="New Password"
          secureTextEntry
        />
        <Button title="Change Password" onPress={handleChangePassword} />
      </View>

      {/* Dark Mode + Logout in one row */}
      <View style={styles.row}>
        <View style={styles.flexButton}>
          <Button
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            onPress={toggleTheme}
          />
        </View>
        <View style={styles.flexButton}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: { marginVertical: 15, paddingHorizontal: 20 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 20
  },
  flexButton: { flex: 1, marginHorizontal: 5 }
});
