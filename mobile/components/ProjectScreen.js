// components/ProjectScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getProjects } from '../controllers/projectController';
import { useNavigation } from '@react-navigation/native';

export default function ProjectScreen() {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    loadProjects();
  }, []);

  const handleNavigate = (screen, projectId) => {
    navigation.navigate(screen, { projectId });
  };

  const renderProject = ({ item }) => (
    <View style={styles.projectCard}>
      <Text style={styles.projectName}>{item.name}</Text>
      <View style={styles.quickNav}>
        <TouchableOpacity style={styles.navBtn} onPress={() => handleNavigate('Tasks', item.id)}>
          <Text>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => handleNavigate('Timeline', item.id)}>
          <Text>Timeline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => handleNavigate('Collaborators', item.id)}>
          <Text>Collaborators</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => handleNavigate('Comments', item.id)}>
          <Text>Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => handleNavigate('History', item.id)}>
          <Text>History</Text>
        </TouchableOpacity>
        {/* ✅ New Records button */}
        <TouchableOpacity style={styles.navBtn} onPress={() => handleNavigate('Records', item.id)}>
          <Text>Records</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id?.toString() ?? String(item.projectId)}
        renderItem={renderProject}
        ListEmptyComponent={<Text>No projects found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  projectCard: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  projectName: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  quickNav: { flexDirection: 'row', flexWrap: 'wrap' },
  navBtn: {
    margin: 4,
    padding: 6,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
});
