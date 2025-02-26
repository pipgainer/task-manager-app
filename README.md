# Task Manager App

A React Native (Expo) application for managing tasks efficiently with authentication, task management features, and a user-friendly interface.

## Features

- User authentication (Signup, Login, Logout, Reset Password)
- Task management (Create, Read, Update, Delete tasks)
- JWT-based authentication
- Theming support (Dark & Light mode)
- Redux or Context API for state management
- React Navigation for smooth navigation
- AsyncStorage for local token storage

## Tech Stack

- **Frontend:** React Native (Expo), React Navigation, Context API / Redux Toolkit
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT-based authentication
- **State Management:** Context API or Redux Toolkit

## Setup Instructions

### Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Install [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/task-manager-app.git
   cd task-manager-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the Expo development server:**
   ```sh
   expo start
   ```

### Running on a Device or Emulator

- Use the **Expo Go** app to scan the QR code.
- Run on an Android Emulator: `npx expo run:android`
- Run on an iOS Simulator (Mac only): `npx expo run:ios`
