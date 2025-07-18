import { useState } from 'react'
import Navbar from './Navbar'
import LobbyList from './LobbyList'
import CreateLobbyForm from './CreateLobbyForm'
import GameRoom from './GameRoom'
import Modal from './Modal'
import CloudBackground from './CloudBackground'
import { Browser } from 'react-kawaii'

function GameLobby() {
  const [gameState, setGameState] = useState('lobbyList')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [roomCode, setRoomCode] = useState('')

  const handleCreateLobby = () => {
    setShowCreateModal(true)
  }

  const handleJoinRoom = (lobbyId, pin) => {
    const roomCode = Math.floor(1000 + Math.random() * 9000).toString()
    setRoomCode(roomCode)
    setGameState('waiting')
  }

  const handleCreateRoom = (lobbyData) => {
    setPlayerName(lobbyData.name)
    setRoomCode(lobbyData.roomCode)
    setShowCreateModal(false)
    setGameState('waiting')
  }

  const handleGameStart = () => {
    setGameState('playing')
  }

  return (
    <div className="min-h-screen bg-shiba-bg flex flex-col relative">
      <CloudBackground />
      {gameState !== 'playing' && <Navbar />}
      
      <div className="flex-1 relative z-10">
        {gameState === 'lobbyList' && (
          <>
            <LobbyList 
              onCreateLobby={handleCreateLobby}
              onJoinLobby={handleJoinRoom}
            />
            
            <Modal
              isOpen={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              title="Create New Lobby"
            >
              <CreateLobbyForm onCreateRoom={handleCreateRoom} />
            </Modal>
          </>
        )}
        
        {gameState === 'waiting' && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] p-4">
            <div className="nes-container with-title is-centered bg-white">
              <p className="title">Waiting Room</p>
              <div className="flex flex-col items-center space-y-4">
                <Browser size={150} mood="shocked" color="#FDB7DA" />
                <p className="text-sm animate-pulse">Waiting for opponent...</p>
                <div className="nes-badge is-splited">
                  <span className="is-dark">Room</span>
                  <span className="is-warning">{roomCode}</span>
                </div>
                <p className="text-xs text-gray-600 mt-4">Share this code with your friend!</p>
                
                <button
                  type="button"
                  className="nes-btn is-primary text-xs mt-4"
                  onClick={handleGameStart}
                >
                  Start Game (Demo)
                </button>
              </div>
            </div>
          </div>
        )}
        
        {gameState === 'playing' && (
          <GameRoom 
            playerName={playerName}
            roomCode={roomCode}
          />
        )}
      </div>
    </div>
  )
}

export default GameLobby