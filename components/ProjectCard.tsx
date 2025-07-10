// components/ProjectCard.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Project = {
  id: string | number;
  title: string;
  tasks: {
    id: string | number;
    text: string;
    completed: boolean;
  }[];
};

type ProjectCardProps = {
  project: Project;
  onPress: (id: string | number) => void;
};

export default function ProjectCard({ project, onPress }: ProjectCardProps) {
  const total = project.tasks.length;
  const completed = project.tasks.filter(t => t.completed).length;

  const status = total === completed && total > 0 ? 'Completed' : 'In Progress';

  return (
    <Pressable onPress={() => onPress(project.id)} style={styles.card}>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.subtext}>{`${completed} of ${total} tasks done`}</Text>
      <Text
        style={[
          styles.status,
          status === 'Completed' ? styles.statusCompleted : styles.statusInProgress,
        ]}
      >
        {status}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e2e8f0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: '#475569',
  },
  status: {
    marginTop: 8,
    fontWeight: '500',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 13,
  },
  statusCompleted: {
    backgroundColor: '#4ade80', // green
    color: '#065f46',
  },
  statusInProgress: {
    backgroundColor: '#facc15', // yellow
    color: '#78350f',
  },
});
