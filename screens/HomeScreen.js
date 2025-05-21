import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const [todos, setTodos] = useState([]);

  const todosToDo = todos.filter(todo => !todo.done);
  const todosDone = todos.filter(todo => todo.done);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Todo',
      headerTitleStyle: styles.headerTitle,
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('Add', {
              todos,
              setTodos,
            })
          }
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, todos, setTodos]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Att göra</Text>
      <FlatList
        data={todosToDo}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('Detail', {
                todo: item,
                todos,
                setTodos,
              })
            }
          >
            <View style={styles.row}>
              <Text style={item.done ? styles.doneText : styles.text}>
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#888" />
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.sectionHeader}>Genomfört</Text>
      <FlatList
        data={todosDone}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('Detail', {
                todo: item,
                todos,
                setTodos,
              })
            }
          >
            <Text style={item.done ? styles.doneText : styles.text}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  addButton: { padding: 8, backgroundColor: '#007AFF', borderRadius: 5, marginRight: 10 },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  sectionHeader: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontSize: 18 },
  doneText: { fontSize: 18, textDecorationLine: 'line-through', color: 'gray' },
});
