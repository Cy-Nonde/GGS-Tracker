//mobile/components/AuthScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "../services/api";

export default function AuthScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    const result = await login(username, password);
    if (result.success) {
      global.USERNAME = result.username;
      global.API_TOKEN = `Bearer ${result.token}`;

      if (rememberMe) {
        await AsyncStorage.setItem("USERNAME", result.username);
        await AsyncStorage.setItem("API_TOKEN", `Bearer ${result.token}`);
      }

      navigation.replace("Chat");
    } else {
      alert("Login failed: " + result.error);
    }
  };

  const handleRegister = async () => {
    const result = await register(username, password);
    alert(result.success ? "Registration successful!" : "Error: " + result.error);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <View style={styles.checkboxContainer}>
        <Button title={rememberMe ? "✓ Remember Me" : "Remember Me"} onPress={() => setRememberMe(!rememberMe)} />
      </View>
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
  checkboxContainer: { marginVertical: 10 }
});
