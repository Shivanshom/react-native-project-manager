# 📱 React Native Project Manager App

A simple mobile app built with **React Native + Expo** to manage projects and tasks.  
Users can create projects, add tasks, toggle their completion status, and track progress — all locally on their device.

---

## 🚀 Getting Started

Follow these steps to run the app on your local machine.

### ⚠️ Prerequisites

Make sure the following versions are installed on your system:

- **Node.js**: ≥ 18.x
- **npm**: ≥ 9.x
- **Expo CLI**:  
  Install globally if not already:

  ```bash
  npm install -g expo-cli
   ```

📦 Installation
Clone the repository:

```bash
git clone https://github.com/Shivanshom/react-native-project-manager.gitreact-native-project-manager.git
cd react-native-project-manager
```

Install dependencies:

```bash
npm install
```
Start the Expo development server:
```bash
npm start
```

📱 Running the App
- Install the Expo Go app on your Android or iOS device.

- Scan the QR code from the terminal .

- The app will launch on your phone.

💡 You can also run the app using an Android or iOS simulator if set up on your system.

🧠 Features
- Create and view multiple projects

- Track task progress within each project

- Add, delete, and toggle tasks

- Local data persistence using AsyncStorage

- Smart status updates (In Progress / Completed)

- Clean and responsive UI

⚠️ Notes / Challenges
- While building the app, I encountered a challenging keyboard layout bug:

- When the keyboard was dismissed after adding a task, it left unexpected white space.

- I tried several layout solutions (e.g., KeyboardAvoidingView, KeyboardAwareScrollView, conditional styling).

- The final fix was to trigger a router.replace() on keyboardDidHide, which reliably resets the layout.

Although not the most elegant solution, it resolved the issue consistently across devices.
(This could be further improved in future iterations.)

📂 Tech Stack
- React Native + Expo

- TypeScript

- expo-router (React Navigation)

- AsyncStorage (local storage)

- Functional components with hooks