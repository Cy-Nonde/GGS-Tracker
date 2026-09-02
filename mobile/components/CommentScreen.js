// components/CommentScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { getComments, addComment } from '../controllers/commentController';
import { useNavigation } from '@react-navigation/native';

export default function CommentScreen({ route }) {
  const { projectId } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getComments(projectId).then(setComments);
  }, [projectId]);

  const handleAdd = async () => {
    const comment = await addComment({ projectId, text: newComment });
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments for Project {projectId}</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>- {item.text}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Post Comment" onPress={handleAdd} />

      {/* Navigation buttons */}
      <Button title="View Tasks" onPress={() => navigation.navigate('Tasks', { projectId })} />
      <Button title="View Timeline" onPress={() => navigation.navigate('Timeline', { projectId })} />
      <Button title="View Collaborators" onPress={() => navigation.navigate('Collaborators', { projectId })} />
      <Button title="View History" onPress={() => navigation.navigate('History', { projectId })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8 },
});
