// app/index.tsx
import { Octicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects, saveAllProjects } from '../storage/dataStorage';
type Task = {
  id: string | number;
  text: string;
  completed: boolean;
};

type Project = {
  id: string | number;
  title: string;
  tasks: Task[];
};

export default function ProjectsListScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: 'My Projects',
    });
  }, []);
  useFocusEffect(
    useCallback(() => {
      const loadProjects = async () => {
        const data = await getAllProjects();
        setProjects(data);
      };
      loadProjects();
    }, [])
  );
  const handleAddProject = async () => {
    if (!projectTitle.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      title: projectTitle.trim(),
      tasks: [],
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    await saveAllProjects(updatedProjects);
    setProjectTitle('');
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>My Projects</Text> */}
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={(id) => router.push(`/${id}`)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.fabText}>
          <Octicons name="plus" size={24} color="white" />
        </Text>
      </TouchableOpacity>
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Project</Text>
            <TextInput
              placeholder="Enter project title"
              value={projectTitle}
              onChangeText={setProjectTitle}
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={handleAddProject}
              >
                <Text style={{ color: 'white' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 125,
    backgroundColor: '#2563eb',
    borderRadius: 30,
    padding: 16,
    elevation: 4,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",

  },
  fabText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // heading: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 16,
  //   color: '#1e293b',
  // },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    backgroundColor: '#94a3b8',
    padding: 10,
    borderRadius: 6,
  },
  addBtn: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 6,
  },
});
