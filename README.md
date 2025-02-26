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
- Run on an Android Emulator: `npm run android`
- Run on an iOS Simulator (Mac only): `npm run ios`

## API Setup (Backend)

1. Clone the backend repository:
   ```sh
   git clone https://github.com/yourusername/task-manager-backend.git
   cd task-manager-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the `.env` file:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory and add:

```sh
EXPO_PUBLIC_API_URL=http://your_backend_api_url
```

## Folder Structure

```
.
├── src
│   ├── api        # API calls
│   ├── components # Reusable components
│   ├── context    # Context API (if used)
│   ├── navigation # Navigation files
│   ├── screens    # App screens
│
│
├── App.js         # Entry point
├── package.json   # Dependencies
└── README.md      # Documentation
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
