# 📱 Field Agent Pro

A modern **React Native mobile application** built with an **Offline-First architecture**, ensuring a seamless user experience even with unstable or no internet connectivity.

## 🚀 Features

* 📡 Offline-First data handling
* 💾 Local database using SQLite + Drizzle ORM
* 🔄 Background sync using a Native Module (Android WorkManager)
* 🎨 Dark / Light theme support
* 🌍 Multi-language support (English / Arabic + RTL)
* 🧪 Unit testing with Jest
* 🖥️ Mock API server for development

## 🛠️ Tech Stack

* React Native
* Expo SQLite
* Drizzle ORM
* Redux Toolkit
* i18next (Localization)
* Android Native Modules (Java + WorkManager)
* Jest (Testing)

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Esraa22M/field_agent_pro.git
cd field_agent_pro
##  Install Dependencies
npm install
🖥️ Running the Mock Server
yarn mock
🖥️ Running the App
npx react-native run-android
Make sure an emulator is running or a physical device is connected.
Running Tests
npx jest src/unitTest/shipmentsSlice.test.ts --env=node
Architecture Overview
The app follows a clean layered architecture
UI Layer (Screens / Components)
        ↓
State Management (Redux)
        ↓
Repository Layer
        ↓
Local DB (Drizzle + SQLite)
        ↓
Sync Layer (Native Module)
        ↓
Mock API Server
🗄️ Data Layer
Technologies Used
Expo SQLite (Local storage)
Drizzle ORM (Database management)
Mock API Server
Structure
data/
 ├── api/mock/
 ├── dbOrm/
 │    ├── schema/
 │    ├── queries/
 │    ├── repositories/
 │    └── mappers/
 └── drizzle/
 Repositories → Bridge between UI and data sources
Queries → Handle database operations
Mappers → Transform API ↔ DB models
Mock API → Simulates backend responses
📡 Offline-First Strategy

The app is designed to work offline by default.

Flow
Data is always read from local database
User actions are saved locally first
Changes are queued for sync
Background sync sends updates to API
Server data is pulled and merged locally
Benefits
Works without internet
Fast UI response
Reliable data persistence
🧩 Native Module (Background Sync)

A custom Android Native Module is implemented for background synchronization.

Key Components
SyncModule.java
SyncPackage.java
BackgroundSyncModule.java
BackgroundSyncWorker.java
How It Works
Uses Android WorkManager to run tasks in the background
Syncs data:
Local SQLite → API
API → Local SQLite
JavaScript Bridge
import { NativeModules } from 'react-native';
const { SyncModule } = NativeModules;
SyncModule.startBackgroundSync();
🎨 UI Architecture
Structure
src/
 ├── screens/
 ├── components/
 └── navigation/
Navigation
Stack Navigator → Screen transitions
Bottom Tabs → Main app sections
🌙 Theming
Implemented using Theme Context
Supports Light Mode and Dark Mode
const { theme, isDark, toggleTheme } = useTheme();
🌍 Localization
Powered by i18next
Supports English 🇺🇸 and Arabic 🇸🇦 (RTL)
t('settings')
Language Switching
i18n.changeLanguage('en');
i18n.changeLanguage('ar');
🔄 Background Sync UI
Available in Settings Screen
Shows:
Sync status (Active)
Last sync time
Integrated with Native Module
💡 Design Decisions
Offline-first ensures reliability and fast UI
Native module provides robust background execution
Clean architecture for scalability
Mock server simplifies development and testing
📌 Future Improvements
Real backend integration
Advanced conflict resolution (beyond LWW)
Push-based sync using WebSockets
iOS background sync support

# # Watch the demo of the MealNavigator App here: [Field Agent Pro App Demo](https://youtu.be/KkusJoPSVAs?si=VnLI_L8Bn68p08V5)


👩‍💻 Author

Esraa Mohamed


