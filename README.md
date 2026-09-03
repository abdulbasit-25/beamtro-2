# Beamtro — Real-Time Communication Platform

> **One room. Voice, video, screen, and everything said.**

Beamtro is a lightweight, modern real-time communication platform designed for quick and frictionless collaboration.

Create a temporary room, share a short code or link, and connect with **2–6 people** through text chat, voice, video, and screen sharing — without creating an account or installing anything.

The goal of Beamtro is simple:

**Open → Create/Join → Connect → Talk**

---

## ✨ Features

### 🚀 Temporary Rooms

- Create rooms instantly
- Generate short room codes
- Share rooms using a unique URL
- No account or registration required
- Designed for temporary conversations and collaboration

### 💬 Real-Time Chat

- Send messages inside the room
- Display names for participants
- Message timestamps
- Own-message identification
- Scroll through previous messages
- Chat remains available throughout the session

### 🎙️ Voice Communication

- Real-time audio communication
- Microphone controls
- Microphone status indicators
- Speaking indicators
- Connection status feedback

### 📹 Video Calls

- Real-time video communication
- Participant video tiles
- Camera controls
- Camera status indicators
- Responsive video layout

### 🖥️ Screen Sharing

Screen sharing is a core feature of Beamtro.

Use it for:

- Presentations
- Technical support
- Collaboration
- Demonstrations
- Remote assistance

When screen sharing is active, the shared screen becomes the primary visual while participants remain accessible.

### 👥 Participant Management

The participant panel displays:

- Display name
- Microphone status
- Camera status
- Speaking indicator
- Current-user identification

Beamtro is designed to support **2–6 participants** per room.

### 🔗 Easy Invitations

Users can join using either:

- Room code
- Full room URL

Example:

```text
/room/ABC123
```

Users can also copy and share their invitation link directly from the room.

---

## 🎨 Design Philosophy

Beamtro is intentionally designed to avoid the complexity of traditional meeting platforms.

The interface focuses on being:

- Minimal
- Premium
- Modern
- Technical
- Calm
- Spacious
- Highly readable
- Responsive
- Professional without feeling overly corporate

The product avoids unnecessary dashboards, excessive cards, complicated onboarding, and overwhelming settings.

> **The product's strongest feature is its simplicity.**

---

## 🧩 Core Experience

The entire product is centered around a single communication room.

```text
                ┌──────────────────┐
                │     BEAMTRO      │
                └────────┬─────────┘
                         │
              Create / Join Room
                         │
                         ▼
                ┌──────────────────┐
                │   Communication  │
                │      Room        │
                └────────┬─────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
      Chat             Voice            Video
                         │
                         ▼
                  Screen Sharing
```

Everything happens inside one unified room rather than forcing users to navigate between separate pages.

---

## 🔄 Connection States

Beamtro provides clear feedback for different connection conditions:

| State          | Description                          |
| -------------- | ------------------------------------ |
| `Idle`         | No room is connected                 |
| `Connecting`   | Establishing the connection          |
| `Connected`    | Room is active                       |
| `Reconnecting` | Attempting to restore the connection |
| `Disconnected` | Connection has been lost             |

These states are designed to communicate what's happening without overwhelming the user.

---

## 📱 Responsive Design

Beamtro is designed for:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Mobile
- 📲 Tablet

The mobile experience is intentionally reorganized rather than simply shrinking the desktop interface.

Room controls, video, chat, participants, and screen sharing adapt to smaller screens.

---

## 🔐 Privacy & Simplicity

Beamtro follows a temporary-room approach.

- No registration required
- No account wall
- No complicated onboarding
- Display names are temporary
- No installation required
- Quick room creation and joining

The project is designed around the idea of getting people connected with as little friction as possible.

---

## 🛠️ Technical Requirements

The project is intended to preserve and build upon the existing communication functionality rather than unnecessarily replacing working systems.

Before modifying the application, the existing architecture should be inspected, including:

- Room functionality
- Chat functionality
- WebRTC functionality
- Authentication/session logic
- API logic

Existing working functionality should be preserved and improved where possible.

---

## 📂 Project Structure

A typical project structure can be organized as:

```text
beamtro/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── styles/
│   └── ...
│
├── package.json
├── README.md
└── ...
```

> The exact structure may vary depending on the existing implementation.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Clone the Repository

```bash
git clone <this-repository-url>
```

### Navigate to the Project

```bash
cd <repository-name>
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application should then be available through the local development URL provided by your development environment.

---

## 🧪 Development

During development, make sure to test:

### Room Creation

- Display-name validation
- Unique room generation
- Room-code generation
- Shareable URL generation
- Direct navigation into rooms

### Room Joining

- Joining with room codes
- Joining with room URLs
- Invalid room handling
- Temporary display names

### Communication

- Text chat
- Microphone
- Camera
- Screen sharing
- Participant updates
- Speaking indicators
- Connection status

### Error Handling

Test scenarios including:

- Camera unavailable
- Microphone unavailable
- Screen sharing unavailable
- Unable to join
- Connection loss
- Reconnection

---

## 🌐 Creator

### Built by Abdul Basit

Beamtro was created by **Abdul Basit**, also known as **Archer**, as a practical and modern way to bring people into a shared space for conversations, support, and presentation-style sessions.

**Portfolio:**  
https://abdulbasit-archer.vercel.app/

---

## 🎯 Product Vision

Beamtro aims to provide a communication experience that feels like an instrument rather than a complicated SaaS dashboard.

The intended experience is:

```text
Open
  ↓
Create / Join
  ↓
Connect
  ↓
Talk
```

There should be:

- No unnecessary onboarding
- No account wall
- No complicated dashboard
- No overwhelming interface
- No unnecessary settings

Just a room and the people inside it.

---

## 💡 Use Cases

Beamtro can be used for:

- Quick team discussions
- Remote assistance
- Technical support
- Online presentations
- Small group meetings
- Collaborative sessions
- Screen demonstrations
- Temporary conversations
- Peer-to-peer communication

---

## 🔮 Future Improvements

Potential future improvements include:

- Improved room moderation
- Better connection diagnostics
- Enhanced mobile controls
- More advanced participant management
- Additional accessibility improvements
- Improved performance monitoring
- Advanced screen-sharing controls
- Optional room security features

---

## 📜 License

This project is owned and maintained by **Abdul Basit / Archer**.

Add your preferred open-source or proprietary license here if you plan to distribute the project publicly.

---

## ⭐ Support

If you find Beamtro useful or interesting, consider giving the repository a ⭐ on GitHub.

---

### Beamtro

**One room. Voice, video, screen, and everything said.**

Built with simplicity in mind.

**Powered by Archer.**
