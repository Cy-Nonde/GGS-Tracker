// screens/ChatScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { getChatHistory, sendMessage } from '../controllers/chatController';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getChatHistory().then(setMessages);
  }, []);

  const handleSend = async () => {
    const newMsg = await sendMessage(input);
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <ScrollView style={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <Text key={idx}>{msg.text}</Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  chatWindow: { flex: 1, marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 4 },
});
