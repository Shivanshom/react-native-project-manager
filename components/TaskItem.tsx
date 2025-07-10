import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Task = {
  id: number | string;
  text: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string | number) => void;
  onDelete: (id: string | number) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onToggle(task.id)}>
        <Ionicons
          name={task.completed ? 'checkbox' : 'square-outline'}
          size={24}
          color="#333"
        />
      </Pressable>
      <Text
        style={[
          styles.text,
          task.completed && styles.completedText,
        ]}
      >
        {task.text}
      </Text>
      <Pressable onPress={() => onDelete(task.id)} style={styles.deleteBtn}>
        <Ionicons name="trash" size={20} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#1e293b',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  deleteBtn: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
});
