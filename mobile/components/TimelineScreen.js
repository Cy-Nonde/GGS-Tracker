// components/TimelineScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getTimeline } from '../controllers/timelineController';
import { useNavigation } from '@react-navigation/native';

export default function TimelineScreen({ route }) {
  const { projectId } = route.params;
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getTimeline(username = "guest").then(setEvents);
  }, [projectId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timeline for Project {projectId}</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.date}: {item.description}</Text>
        )}
      />
      {/* Navigation buttons */}
      <Button title="View History" onPress={() => navigation.navigate('History', { username })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
});
