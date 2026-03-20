# 📱 React Native App (Bare CLI + Storybook)

This project is a **React Native application built without a framework** (no Expo), using the **React Native Community CLI** and **Storybook** for component-driven development.

## 🚀 Tech Stack

* React Native (Bare / CLI)
* TypeScript
* Storybook (for UI component development)
* Metro Bundler

## 📚 Getting Started

This project follows the official React Native guide:
👉 <https://reactnative.dev/docs/getting-started-without-a-framework>

### 1. Create Project

```bash
npx @react-native-community/cli@latest init MyApp
cd MyApp
```

> Avoid using old global `react-native-cli` as it may cause issues.

---

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

---

### 3. Start Metro

Metro is the JavaScript bundler used by React Native (similar to Webpack/Vite but optimized for RN).

```bash
yarn start
```

---

### 4. Run App

#### Android

```bash
yarn android
```

#### iOS

```bash
cd ios && pod install && cd ..
yarn ios
```

---

## 🧱 Project Structure

```
├── .rnstorybook       # Storybook stories
├── stories/           # Storybook config
src/
├── components/        # Reusable UI components
├── screens/           # Screen-level components
├── hooks/             # Custom hooks
├── services/          # API / business logic
├── utils/             # Helpers
├── theme/        
└── App.tsx
```

---

## 🎨 Component Development with Storybook

We use **Storybook** to build UI components in isolation.

### Install Storybook

```bash
npx storybook@latest init
```

---

### Run Storybook

```bash
yarn storybook
```

---

### Example Component

```tsx
// src/components/Button/Button.tsx
import { Text, Pressable } from 'react-native';

export const Button = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
};
```

---

### Example Story

```tsx
// src/stories/Button.stories.tsx
import { Button } from '../components/Button/Button';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = () => (
  <Button title="Click me" onPress={() => {}} />
);
```

## 🔄 Development Workflow

1. Build UI components in **Storybook first**
2. Test states (loading, error, disabled, etc.)
3. Integrate into screens
4. Connect to API / business logic

## 📦 Scripts

```json
{
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "storybook": "storybook dev -p 7007"
  }
}
```

## 🧠 Notes

* This project uses **bare React Native**, so:

  * You manage native code (Android / iOS)
  * You manually install libraries
* Metro handles JS bundling and transforms JSX → JS
* You can fully control native modules (camera, sensors, etc.)

---

## ⚠️ Troubleshooting

### Metro issues

```bash
npx react-native start --reset-cache
```

### iOS issues

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
```
