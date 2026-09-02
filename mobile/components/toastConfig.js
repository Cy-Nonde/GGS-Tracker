// toastConfig.js
import React from 'react';
import { View, Text } from 'react-native';

export const toastConfig = {
  
  success: ({ text1, text2 }) => (
    <View style={{ backgroundColor: '#4CAF50', padding: 12, borderRadius: 8 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>✅ {text1}</Text>
      {text2 ? <Text style={{ color: '#fff' }}>{text2}</Text> : null}
    </View>
  ),
  
  info: ({ text1, text2 }) => (
    <View style={{ backgroundColor: '#2196F3', padding: 12, borderRadius: 8 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>✏️ {text1}</Text>
      {text2 ? <Text style={{ color: '#fff' }}>{text2}</Text> : null}
    </View>
  ),
  
  error: ({ text1, text2 }) => (
    <View style={{ backgroundColor: '#F44336', padding: 12, borderRadius: 8 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>❌ {text1}</Text>
      {text2 ? <Text style={{ color: '#fff' }}>{text2}</Text> : null}
    </View>
 
  notification: ({ text1, text2 }) => (
    <View style={{ backgroundColor: '#9E9E9E', padding: 12, borderRadius: 8 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>🔔 {text1}</Text>
      {text2 ? <Text style={{ color: '#fff' }}>{text2}</Text> : null}
    </View>
  ),
};

    
  ),
};
