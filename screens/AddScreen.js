import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AddScreen({ route, navigation }) {
  const { todos, setTodos } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = () => {
    if (title.trim().length === 0) return;
    const newTodo = {
      id: Date.now(),
      title,
      description,
      done: false,
      date: Date.now(), 
    };
    setTodos([...todos, newTodo]);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'New todo',
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity
          onPress={addTodo}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, description, todos, setTodos]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  addButton: { padding: 8, backgroundColor: '#007AFF', borderRadius: 5, marginRight: 10 },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
