//mobile/components/ChatBox.js
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, Picker } from "react-native";
import { sendMessage, loadHistory, clearHistory, updateMode, changePassword } from "../services/api";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("default");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const username = global.USERNAME || "guest";

  // Load history when component mounts
  useEffect(() => {
    (async () => {
      const history = await loadHistory(username);
      setMessages(history);
      if (history.length > 0) {
        const lastMode = history[history.length - 1].mode || "default";
        setMode(lastMode);
      }
    })();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const { reply, mode: updatedMode } = await sendMessage(input, [], mode, username);
    setMode(updatedMode);

    const aiMsg = { role: "ai", content: reply };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleClearHistory = async () => {
    const success = await clearHistory(username);
    if (success) {
      setMessages([]);
      setMode("default");
    }
  };

  const handleSaveMode = async () => {
    const result = await updateMode(mode);
    if (result.success) {
      alert("Mode preference saved!");
    }
  };

  const handleChangePassword = async () => {
    const result = await changePassword(oldPass, newPass);
    alert(result.success ? "Password updated!" : "Error: " + result.error);
    setOldPass("");
    setNewPass("");
  };

  return (
    <View style={styles.container}>
      {/* Mode Picker */}
      <Picker selectedValue={mode} onValueChange={(val) => setMode(val)}>
        <Picker.Item label="Default" value="default" />
        <Picker.Item label="Study" value="study" />
        <Picker.Item label="Shopping" value="shopping" />
        <Picker.Item label="Productivity" value="productivity" />
      </Picker>
      <Button title="Save Mode" onPress={handleSaveMode} />
      
    <View style={darkMode ? styles.darkContainer : styles.lightContainer}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.role === "user" ? styles.user : styles.ai}>{item.content}</Text>
        )}
      />
      <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Type a message..." />
      <Button title="Send" onPress={handleSend} />
    </View>
    );
}

      {/* Chat Window */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.role === "user" ? styles.user : styles.ai}>
            {item.content}
          </Text>
        )}
      />

      {/* Input + Send */}
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={handleSend} />

      {/* Clear History */}
      <Button title="Clear History" onPress={handleClearHistory} />

      {/* Change Password */}
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
  );
}

  const styles = StyleSheet.create({
  lightContainer: { flex: 1, backgroundColor: "#f4f6f8", padding: 10 },
  darkContainer: { flex: 1, backgroundColor: "#121212", padding: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
  user: { alignSelf: "flex-end", backgroundColor: "#2e7d32", color: "#fff", padding: 8, margin: 4 },
  ai: { alignSelf: "flex-start", backgroundColor: "#c62828", color: "#fff", padding: 8, margin: 4 }
});
