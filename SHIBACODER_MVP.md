# ShibaCoder MVP: 6-Hour Frontend-Focused Build

## Quick Overview
Real-time 1v1 coding battles. Two players, one problem, first to solve wins. Built for 6-7 hour implementation with frontend focus.

## Timeline Breakdown
- **Hour 1**: Setup + Basic UI Components
- **Hour 2-3**: Game Room + Monaco Editor Integration  
- **Hour 4-5**: Socket.IO + Real-time Updates
- **Hour 6**: Polish + Demo Prep

## Instant Setup (10 mins)
```bash
# Full project setup
npx create-react-app shibacoder-client
cd shibacoder-client
npm install socket.io-client @monaco-editor/react

# Backend (minimal - can be done by teammate or last)
mkdir shibacoder-server && cd shibacoder-server
npm init -y
npm install express socket.io cors
```

## Core Components Only

### 1. App.js (Main Router)
```javascript
// 3 states: lobby, waiting, playing
const [gameState, setGameState] = useState('lobby');
const [roomCode, setRoomCode] = useState('');
const [playerName, setPlayerName] = useState('');
```

### 2. Lobby.js (15 mins)
```javascript
// Just two inputs and two buttons
// - Name input
// - Create Room button → generates 4-digit code
// - Join Room input + button
// No styling needed yet, just functionality
```

### 3. GameRoom.js (45 mins)
```javascript
// Split screen layout with CSS Grid
// Left: Monaco Editor
// Right: Opponent status + test results
// Top: Timer + Submit button
```

### 4. Socket Connection (socket.js)
```javascript
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
export default socket;
```

## Minimal Socket Events

```javascript
// Frontend emits (4 events only):
socket.emit('create-room', { playerName });
socket.emit('join-room', { roomCode, playerName });
socket.emit('submit-code', { code });
socket.emit('player-ready');

// Frontend listens (5 events only):
socket.on('room-created', ({ roomCode }) => {});
socket.on('game-start', ({ problem }) => {});
socket.on('opponent-progress', ({ testsPassed, totalTests }) => {});
socket.on('game-result', ({ winner, scores }) => {});
socket.on('error', ({ message }) => {});
```

## Single Problem Hardcoded (Save Time)

```javascript
// Just use Two Sum for demo
const DEMO_PROBLEM = {
  title: "Two Sum",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
  template: `function twoSum(nums, target) {
    // Write your solution here
}`
};
```

## Minimal Viable UI

### CSS Grid Layout (30 mins)
```css
.game-room {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
  gap: 2px;
  background: #1a1a1a;
}

.header { grid-column: 1 / -1; }
.editor { grid-column: 1; }
.opponent { grid-column: 2; }
```

### Component Structure
```
GameRoom/
├── Header (timer, submit button)
├── EditorPanel (Monaco)
└── OpponentPanel (name, progress, test results)
```

## Monaco Editor Quick Setup (20 mins)

```javascript
import Editor from "@monaco-editor/react";

<Editor
  height="100%"
  defaultLanguage="javascript"
  theme="vs-dark"
  value={code}
  onChange={setCode}
  options={{
    minimap: { enabled: false },
    fontSize: 14
  }}
/>
```

## Test Results Visualization (30 mins)

```javascript
// Simple dots that change color
const TestResults = ({ results }) => (
  <div className="test-results">
    {results.map((passed, i) => (
      <div 
        key={i} 
        className={`test-dot ${passed ? 'passed' : 'failed'}`}
      />
    ))}
  </div>
);

// CSS
.test-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #666;
}
.test-dot.passed { background: #22c55e; }
.test-dot.failed { background: #ef4444; }
```

## Backend Minimal Implementation (Can be done last or by teammate)

```javascript
// server/index.js - 50 lines total
const express = require('express');
const { Server } = require('socket.io');
const app = express();

const io = new Server(3001, {
  cors: { origin: "http://localhost:3000" }
});

const rooms = {};

io.on('connection', (socket) => {
  socket.on('create-room', ({ playerName }) => {
    const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
    rooms[roomCode] = {
      players: [{ id: socket.id, name: playerName, progress: 0 }],
      state: 'waiting'
    };
    socket.join(roomCode);
    socket.emit('room-created', { roomCode });
  });

  socket.on('join-room', ({ roomCode, playerName }) => {
    if (rooms[roomCode] && rooms[roomCode].players.length === 1) {
      rooms[roomCode].players.push({ id: socket.id, name: playerName, progress: 0 });
      socket.join(roomCode);
      io.to(roomCode).emit('game-start', { problem: DEMO_PROBLEM });
    }
  });

  socket.on('submit-code', ({ code }) => {
    // Fake test results for demo
    const passed = Math.random() > 0.3;
    const progress = passed ? 5 : Math.floor(Math.random() * 5);
    socket.emit('test-results', { passed, progress });
    socket.to(roomCode).emit('opponent-progress', { progress, total: 5 });
    
    if (passed) {
      io.to(roomCode).emit('game-result', { winner: socket.id });
    }
  });
});
```

## What to Skip (Save Hours)

❌ **Skip These:**
- User authentication
- Multiple problems
- Real code execution (fake it)
- Database/persistence
- Proper error handling
- Sound effects
- Animations (except basic CSS transitions)
- Mobile responsiveness
- Code syntax validation
- Actual test case running

✅ **Focus Only On:**
- Players can join same room
- See same hardcoded problem
- Type code in Monaco editor
- Click submit → see fake test results
- See opponent's progress update
- Show winner screen

## 6-Hour Schedule

### Hour 1: Foundation
- Create React App + install packages
- Basic component structure
- Lobby component (name + room code)

### Hour 2-3: Game UI
- CSS Grid layout
- Monaco editor integration
- Header with timer
- Test result dots

### Hour 4: Socket.IO
- Connect frontend to backend
- Implement 4 socket events
- Test room creation/joining

### Hour 5: Game Logic
- Submit button functionality
- Opponent progress updates
- Winner determination
- Basic styling with CSS variables

### Hour 6: Demo Polish
- Fix any bugs
- Add minimal CSS transitions
- Prepare demo flow
- Deploy to localhost

## Demo Script (2 minutes)

1. **Setup (20s)**: Open two browser windows, create room, join room
2. **Problem (10s)**: "Both players see Two Sum problem"
3. **Race (60s)**: Type solution, show real-time progress, submit
4. **Victory (10s)**: Winner screen appears
5. **Tech (20s)**: "React, Socket.IO, Monaco Editor, real-time sync"

## Emergency Shortcuts

If running out of time:
1. **No Backend?** Use React state + localStorage to fake multiplayer
2. **No Monaco?** Use regular textarea with monospace font
3. **No Timer?** Static "5:00" text
4. **No Test Results?** Just show "3/5 Passed" text

## Deployment for Demo

```bash
# Just run locally
# Terminal 1: cd server && node index.js
# Terminal 2: cd client && npm start
# Open http://localhost:3000 in two browsers
```

Remember: A working demo beats perfect code. Focus on the core experience of two people racing to solve a problem.