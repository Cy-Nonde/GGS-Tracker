// components/CollaboratorScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getCollaborators } from '../controllers/collaboratorController';
import { useNavigation } from '@react-navigation/native';

export default function CollaboratorScreen({ route }) {
  const { projectId } = route.params;
  const [collaborators, setCollaborators] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCollaborators(projectId).then(setCollaborators);
  }, [projectId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collaborators for Project {projectId}</Text>
      <FlatList
        data={collaborators}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} ({item.role})</Text>
        )}
      />
      {/* Navigation buttons */}
      <Button title="View Tasks" onPress={() => navigation.navigate('Tasks', { projectId })} />
      <Button title="View Timeline" onPress={() => navigation.navigate('Timeline', { projectId })} />
      <Button title="View Comments" onPress={() => navigation.navigate('Comments', { projectId })} />
    <Button title="View History" onPress={() => navigation.navigate('History', { projectId })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
});
