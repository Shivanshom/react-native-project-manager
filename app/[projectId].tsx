// app/[projectId].tsx
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import AddTaskInput from '../components/AddTaskInput';
import TaskItem from '../components/TaskItem';
import { getProjectById, updateProject } from '../storage/dataStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default function ProjectDetailsScreen() {
    const { projectId } = useLocalSearchParams();
    const [project, setProject] = useState<Project | null>(null);
    const navigation = useNavigation();
    const router = useRouter();
    useEffect(() => {
        const hideSub = Keyboard.addListener('keyboardDidHide', () => {

            setTimeout(() => {
                const validProjectId = Array.isArray(projectId) ? projectId[0] : projectId;
                router.replace({ pathname: `/[projectId]`, params: { projectId: validProjectId } });
            }, 100);


        });

        return () => {
            hideSub.remove();
        };
    }, []);

    useEffect(() => {
        const loadProject = async () => {
            const proj = await getProjectById(projectId as string);
            if (!proj) {
                Alert.alert('Project not found');
            } else {
                setProject(proj);
                navigation.setOptions({ title: proj.title });
            }
        };
        loadProject();
    }, [projectId]);



    const handleAddTask = async (text: string) => {
        if (!project) return;
        const newTask: Task = {
            id: Date.now().toString(),
            text,
            completed: false,
        };
        const updated = { ...project, tasks: [...project.tasks, newTask] };
        setProject(updated);
        await updateProject(updated);
    };

    const handleToggleTask = async (taskId: string | number) => {
        if (!project) return;
        const updatedTasks = project.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        const updated = { ...project, tasks: updatedTasks };
        setProject(updated);
        await updateProject(updated);
    };

    const handleDeleteTask = async (taskId: string | number) => {
        if (!project) return;
        const updatedTasks = project.tasks.filter(task => task.id !== taskId);
        const updated = { ...project, tasks: updatedTasks };
        setProject(updated);
        await updateProject(updated);
    };

    if (!project) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading project...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={90}
            >
                <View style={styles.container}>

                    <FlatList
                        keyboardShouldPersistTaps="handled"

                        data={project.tasks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TaskItem
                                task={item}
                                onToggle={handleToggleTask}
                                onDelete={handleDeleteTask}
                            />
                        )}
                        ListEmptyComponent={<Text style={styles.empty}>No tasks yet!</Text>}
                        contentContainerStyle={{ paddingBottom: 0 }}
                    />

                </View>
                <View style={styles.fixedInputContainer}>
                    <AddTaskInput onAdd={handleAddTask} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 40,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1e293b',
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        color: '#94a3b8',
    },
    fixedInputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: '#fff',
    },
});
