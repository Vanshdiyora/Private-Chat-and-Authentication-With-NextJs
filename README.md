# Real-Time Communication Application

## Overview

This project is a real-time communication application developed with Next.js for server-side rendering and enhanced performance. It integrates Socket.io for real-time private chat functionality and implements WebRTC for high-definition peer-to-peer video calls. The application features a responsive UI designed for seamless use on both desktop and mobile devices. 

## Features

- **Server-Side Rendering:** Utilizes Next.js for improved performance and SEO.
- **Real-Time Chat:** Integrated Socket.io for real-time private messaging.
- **High-Definition Video Calls:** Implemented WebRTC for peer-to-peer video communication.
- **Responsive Design:** Ensures a seamless experience across desktop and mobile devices.
- **Secure Message Handling:** Provides secure and efficient message handling with real-time updates and notifications.

## Technologies Used

- **Next.js:** Framework for server-side rendering and React-based UI development.
- **Socket.io:** Library for real-time, bidirectional, and event-based communication.
- **WebRTC:** Technology for real-time communication of audio, video, and data.
- **React:** JavaScript library for building user interfaces.
- **CSS:** For styling and responsive design.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd your-repository
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

5. **Open your browser and visit:**

    ```
    http://localhost:3000
    ```

## Configuration

Make sure to configure the following environment variables:

- `NEXT_PUBLIC_SOCKET_SERVER_URL`: URL of the Socket.io server.
- `WEBRTC_CONFIG`: WebRTC configuration settings for peer-to-peer connections.

Create a `.env.local` file in the root directory and add the required environment variables:

```env
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3001
WEBRTC_CONFIG={"iceServers":[{"urls":"stun:stun.l.google.com:19302"}]}
