// screens/HistoryScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import socket from '../socket'; // shared socket instance

export default function HistoryScreen({ route }) {
  const { projectId } = route.params;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleted, setShowDeleted] = useState(true);
  const [collapsedDays, setCollapsedDays] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:8080/projects/${projectId}/history`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error('History fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [projectId]);

  // 🔔 Realtime socket events (update state only, toasts handled globally in App.js)
  useEffect(() => {
    socket.on('recordCreated', (record) => {
      setHistory((prev) => [...prev, {
        id: `rec-${record.id}-created`,
        type: 'record',
        date: record.createdAt,
        message: `Record created: ${record.data}`,
      }]);
    });

    socket.on('recordUpdated', (record) => {
      setHistory((prev) => [...prev, {
        id: `rec-${record.id}-updated`,
        type: 'record-update',
        date: record.updatedAt,
        message: `Record updated: ${record.data}`,
      }]);
    });

    socket.on('recordDeleted', (record) => {
      setHistory((prev) => [...prev, {
        id: `rec-${record.id}-deleted`,
        type: 'record-delete',
        date: record.deletedAt,
        message: `Record deleted`,
      }]);
    });

    socket.on('notificationSent', (note) => {
      setHistory((prev) => [...prev, {
        id: `note-${note.id}`,
        type: 'notification',
        date: note.deliveredAt,
        message: `${note.message} [${note.status}]`,
      }]);
    });

    return () => {
      socket.off('recordCreated');
      socket.off('recordUpdated');
      socket.off('recordDeleted');
      socket.off('notificationSent');
    };
  }, []);

  const filteredHistory = showDeleted
    ? history
    : history.filter((item) => item.type !== 'record-delete');

  // Group events by day
  const grouped = filteredHistory.reduce((acc, item) => {
    const day = new Date(item.date).toDateString();
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});

  const sections = Object.keys(grouped).map((day) => ({
    day,
    events: grouped[day],
  }));

  const getColor = (type) => {
    switch (type) {
      case 'record': return '#4CAF50';
      case 'record-update': return '#2196F3';
      case 'record-delete': return '#F44336';
      case 'notification': return '#9E9E9E';
      default: return '#000';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'record': return '✅';
      case 'record-update': return '✏️';
      case 'record-delete': return '❌';
      case 'notification': return '🔔';
      default: return '📄';
    }
  };

  const toggleDay = (day) => {
    setCollapsedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const collapseAll = () => {
    const newState = {};
    sections.forEach((s) => { newState[s.day] = true; });
    setCollapsedDays(newState);
  };

  const expandAll = () => {
    const newState = {};
    sections.forEach((s) => { newState[s.day] = false; });
    setCollapsedDays(newState);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History for Project {projectId}</Text>

      <View style={styles.toggleRow}>
        <Text>Show Deleted Records</Text>
        <Switch value={showDeleted} onValueChange={setShowDeleted} />
      </View>

      <View style={styles.toggleRow}>
        <TouchableOpacity onPress={collapseAll} style={styles.controlBtn}>
          <Text style={styles.controlText}>Collapse All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={expandAll} style={styles.controlBtn}>
          <Text style={styles.controlText}>Expand All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(section) => section.day}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleDay(item.day)} style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>{item.day}</Text>
              <Text style={styles.sectionToggle}>
                {collapsedDays[item.day] ? '▶' : '▼'}
              </Text>
            </TouchableOpacity>

            {!collapsedDays[item.day] &&
              item.events.map((event) => (
                <View key={event.id} style={styles.timelineRow}>
                  <View style={styles.timelineLine} />
                  <View style={[styles.timelineDot, { backgroundColor: getColor(event.type) }]}>
                    <Text style={styles.timelineIcon}>{getIcon(event.type)}</Text>
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={[styles.date, { color: getColor(event.type) }]}>{event.date}</Text>
                    <Text style={[styles.message, { color: getColor(event.type) }]}>{event.message}</Text>
                    <Text style={[styles.type, { color: getColor(event.type) }]}>
                      {event.type === 'record-update'
                        ? 'Record Updated'
                        : event.type === 'record-delete'
                        ? 'Record Deleted'
                        : event.type === 'record'
                        ? 'Record Created'
                        : 'Notification'}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlBtn: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
  },
  controlText: { color: '#fff', fontWeight: '600' },
  section: { marginBottom: 20 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 4,
  },
  sectionHeader: { fontSize: 18, fontWeight: 'bold' },
  sectionToggle: { fontSize: 18 },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 12 },
  timelineLine: { width: 2, backgroundColor: '#ccc', marginRight: 12, marginLeft: 6 },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  timelineIcon: { fontSize: 16, color: '#fff' },
  timelineContent: { flex: 1, backgroundColor: '#f9f9f9', borderRadius: 6, padding: 8 },
  date: { fontSize: 14 },
  message: { fontSize: 16 },
  type: { fontSize: 12, fontStyle: 'italic' },
});
