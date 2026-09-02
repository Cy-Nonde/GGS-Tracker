// screens/SplashScreen.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/ggs_logo.png')} // place your logo in /assets
        style={styles.logo}
        resizeMode="contain"
      />

      {/* App Title */}
      <Text style={styles.title}>📊 GGS TRACKER 📊</Text>

      {/* Loader */}
      <ActivityIndicator size="large" color="#FFD700" />

      {/* Subtitle */}
      <Text style={styles.subtitle}>Preparing your workspace...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E2C' },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFD700', marginBottom: 20 },
  subtitle: { marginTop: 10, fontSize: 16, color: '#ccc' },
});
