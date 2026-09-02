// screens/RecordScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecordScreen({ route }) {
  const { projectId } = route.params;
  const [records, setRecords] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(`http://localhost:8080/projects/${projectId}/records`);
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error('Error fetching records:', err);
      }
    };
    fetchRecords();
  }, [projectId]);

  const handleAddRecord = async () => {
    try {
      const res = await fetch(`http://localhost:8080/projects/${projectId}/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: input }),
      });
      const newRecord = await res.json();
      setRecords([...records, newRecord]);
      setInput('');
    } catch (err) {
      console.error('Error adding record:', err);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await fetch(`http://localhost:8080/projects/${projectId}/records/${recordId}`, {
        method: 'DELETE',
      });
      setRecords(records.filter((r) => r.id !== recordId));
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  };

  const handleUpdateRecord = async (recordId) => {
    try {
      const res = await fetch(`http://localhost:8080/projects/${projectId}/records/${recordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: editText }),
      });
      const updated = await res.json();
      setRecords(records.map((r) => (r.id === recordId ? updated : r)));
      setEditingId(null);
      setEditText('');
    } catch (err) {
      console.error('Error updating record:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Records for Project {projectId}</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordRow}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editText}
                  onChangeText={setEditText}
                />
                <Button title="Save" onPress={() => handleUpdateRecord(item.id)} />
                <Button title="Cancel" onPress={() => setEditingId(null)} />
              </>
            ) : (
              <>
                <Text style={styles.recordText}>{item.data}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => {
                      setEditingId(item.id);
                      setEditText(item.data);
                    }}
                  >
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteRecord(item.id)}
                  >
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter record data"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Add Record" onPress={handleAddRecord} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8 },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  recordText: { fontSize: 16, flex: 1 },
  actions: { flexDirection: 'row' },
  editBtn: { backgroundColor: '#4CAF50', paddingHorizontal: 8, marginRight: 6, borderRadius: 4 },
  deleteBtn: { backgroundColor: '#f66', paddingHorizontal: 8, borderRadius: 4 },
  btnText: { color: '#fff' },
});
