# ChatFlow

ChatFlow is a secure messaging app that allows users to communicate with privacy and ease. This app is built using React, Firebase, and integrates Google authentication for easy sign-in. It features profile management, real-time chat, and dark mode functionality to ensure a seamless and modern user experience.

---

## Features

- **User Authentication**: Sign in with Google for quick and easy authentication.
- **Profile Management**: Update profile information, including name, status, and profile picture.
- **Real-time Chat**: Chat with friends in real-time with end-to-end encryption.
- **Dark Mode**: The app supports a dark mode theme for a more comfortable experience in low-light environments.
- **Secure**: The app ensures privacy by encrypting all conversations.

---

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Firebase**: For user authentication, real-time database, and file storage.
- **React Router**: For routing and navigation.
- **Tailwind CSS**: For styling and responsive design.
- **Lucide-React**: For icons used throughout the app.
- **Firestore**: Firebase database to store user and chat data.

---

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/ChatFlow1.git
    cd SafeTalk
    ```

2. **Install dependencies**:

    Ensure you have [Node.js](https://nodejs.org/) installed. Then, run the following command to install the required dependencies:

    ```bash
    npm install
    ```

3. **Setup Firebase**:

    - Go to [Firebase Console](https://console.firebase.google.com/), create a new project (or use an existing one).
    - Enable Firebase Authentication with Google Sign-In.
    - Create a Firestore database.
    - Obtain the Firebase config object from your Firebase console and add it to your project.

    In your project directory, create a `.env` file and add the following Firebase credentials:

    ```env
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

4. **Start the development server**:

    Run the following command to start the React development server:

    ```bash
    npm start
    ```

    This will open the app in your browser at `http://localhost:3000`.

---

## Folder Structure

- `src/`: Contains all the React components and application logic.
- `src/firebase/`: Contains Firebase configuration and services.
- `src/components/`: Contains reusable components like ChatWindow, ChatPanel, Profile, etc.

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

---

## Acknowledgements

- Firebase for providing an easy-to-use backend solution.
- Tailwind CSS for the utility-first styling framework.
- React for being a flexible and efficient JavaScript library for building user interfaces.
