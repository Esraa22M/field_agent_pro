import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const data = [
  { id: '1', title: 'Math Assignment', description: 'Algebra tasks' },
  { id: '2', title: 'Science Assignment', description: 'Physics tasks' },
];

export default function AssignmentsList({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('AssignmentDetails', { item })}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
