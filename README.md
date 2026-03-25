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

### 1. Install Dependencies

```bash
yarn install
```

---

### 2. Start Metro

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
├── components/        
├── screens/           
├── hooks/             
├── services/          
├── utils/             
├── navigation/
├── features/        
└── App.tsx
```

---

## 🎨 Component Development with Storybook

We use **Storybook** to build UI components in isolation.

### Run Storybook

```bash
yarn storybook
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

### Metro issues

```bash
npx react-native start --reset-cache
```
