// storage/dataStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROJECTS_KEY = '@projects_key';

export type Task = {
  id: string | number;
  text: string;
  completed: boolean;
};

export type Project = {
  id: string | number;
  title: string;
  tasks: Task[];
};

export async function getAllProjects(): Promise<Project[]> {
  try {
    const json = await AsyncStorage.getItem(PROJECTS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (err) {
    console.error('Error loading projects', err);
    return [];
  }
}

export async function saveAllProjects(projects: Project[]) {
  try {
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving projects', err);
  }
}

export async function getProjectById(id: string | number): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.id.toString() === id.toString()) ?? null;
}

export async function updateProject(updatedProject: Project) {
  const projects = await getAllProjects();
  const updated = projects.map((p) =>
    p.id === updatedProject.id ? updatedProject : p
  );
  await saveAllProjects(updated);
}
