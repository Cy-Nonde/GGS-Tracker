// components/TaskScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { getTasksByProject, createTask } from '../controllers/taskController';

export default function TaskScreen({ route }) {
  const { projectId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    getTasksByProject(projectId).then(setTasks);
  }, [projectId]);

  const handleAdd = async () => {
    const task = await createTask({ projectId, title: newTask });
    setTasks([...tasks, task]);
    setNewTask('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks for Project {projectId}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>- {item.title}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="New task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={handleAdd} />
      
      <Button title="View History" onPress={() => navigation.navigate('History', { projectId })} />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8 },
});
