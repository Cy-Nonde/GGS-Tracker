// GGSHome.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Switch,
  StyleSheet,
} from 'react-native';

export default function GGSHome() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={[styles.container, darkMode && styles.dark]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>📊 GGS HOME 📊</Text>
        <View style={styles.nav}>
          {[
            'Projects',
            'Tasks',
            'Collaborators',
            'Timeline',
            'Comments',
            'Records',
            'History',
            'Chatbot',
          ].map((item) => (
            <TouchableOpacity key={item} style={styles.navBtn}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AUTH SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={() => {}} />

        <Text style={styles.sectionTitle}>Register</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <Button title="Register" onPress={() => {}} />
      </View>

      {/* CHAT SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chat</Text>
        <View style={styles.chatWindow}>
          {/* Map chat messages here */}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={chatMessage}
          onChangeText={setChatMessage}
        />
        <Button title="Send" onPress={() => {}} />

        <View style={styles.modeControls}>
          <Text>Mode:</Text>
          {/* Replace with Picker or Dropdown */}
          <Button title="Save Mode" onPress={() => {}} />
        </View>

        <Button title="Clear History" onPress={() => {}} />
      </View>

      {/* PROFILE SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Password</Text>
        <TextInput style={styles.input} placeholder="Old Password" secureTextEntry />
        <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
        <Button title="Change Password" onPress={() => {}} />
      </View>

      {/* EXTRAS SECTION */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <Button title="Logout" onPress={() => {}} />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text>© 2026 CSC4004</Text>
        <Text>Cyrus Nonde - 2020893536</Text>
        <Text>GGS TRACKER</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  dark: { backgroundColor: '#222' },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  nav: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  navBtn: { margin: 4, padding: 8, backgroundColor: '#eee', borderRadius: 4 },
  section: { marginVertical: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  chatWindow: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  modeControls: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footer: { marginTop: 20, alignItems: 'center' },
});
