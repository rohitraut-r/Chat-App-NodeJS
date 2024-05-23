# Real-Time Chat Application

A real-time chat application built with Node.js, Express.js, Socket.IO, and Mustache templating engine. This application allows users to communicate in real-time through a web-based chat interface.

## Features

- Real-time bi-directional communication using WebSockets
- User authentication and registration
- Private messaging between users
- Efficient UI rendering with Mustache templates

## Technologies Used

- Node.js
- Express.js
- Socket.IO (for real-time communication)
- Mustache (templating engine)
- MongoDB (for data persistence)

## Getting Started

1. Clone the repository:
https://github.com/rohitraut-r/Chat-App-NodeJS.git

2. Install Dependencies
   npm install

3. Set up the environment variables:
- Create a `.env` file in the root directory
- Add the following variables:
  - `MONGODB_URI`: Your MongoDB connection string
  - `SESSION_SECRET`: A secret key for session management

4. Start the server:
   npm start

The app will be running at `http://localhost:3000`.

## Usage

1. Navigate to `http://localhost:3000` in your web browser.
2. Join or create a chat room.
3. Start sending and receiving real-time messages.

## License

This project is licensed under the [MIT License](LICENSE).
