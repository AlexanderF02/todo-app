import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DetailScreen({ route, navigation }) {
  const { todo, todos, setTodos } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: todo.title,
      headerTitleAlign: 'center',
    });
  }, [navigation, todo.title]);

  const markAsDone = () => {
    setTodos(todos.map(t => t.id === todo.id ? { ...t, done: !t.done } : t));
    navigation.goBack();
  };

  const deleteTodo = () => {
    setTodos(todos.filter(t => t.id !== todo.id));
    navigation.goBack();
  };

  const date = todo.date
    ? new Date(todo.date)
    : new Date(todo.id ? todo.id : Date.now());
  const dateString = date.toLocaleDateString();

  return (
    <View style={styles.container}>
      {todo.description ? (
        <Text style={styles.description}>{todo.description}</Text>
      ) : null}
      <Text style={styles.status}>Status: {todo.done ? 'Done' : 'Not Done'}</Text>
      <TouchableOpacity style={styles.doneButton} onPress={markAsDone}>
        <Text style={styles.doneButtonText}>{todo.done ? 'Undo' : 'Done'}</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.date}>{dateString}</Text>
        <TouchableOpacity onPress={deleteTodo} style={styles.trashButton}>
          <Ionicons name="trash" size={32} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  description: { fontSize: 20, marginBottom: 24, color: '#555', textAlign: 'center' },
  status: { fontSize: 18, marginBottom: 24, textAlign: 'center' },
  doneButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
    alignSelf: 'center',
  },
  doneButtonText: { color: 'white', fontWeight: 'bold', fontSize: 22 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  date: { fontSize: 18, color: '#888' },
  trashButton: { padding: 10 },
});
