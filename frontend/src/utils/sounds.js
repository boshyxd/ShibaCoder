import { Howl } from 'howler'

// Create 8-bit style sound effects using Web Audio API
const createBeepSound = (frequency, duration) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const audioContext = new AudioContext()
  
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'square'
  oscillator.frequency.value = frequency
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

export const sounds = {
  buttonClick: () => createBeepSound(800, 0.1),
  success: () => {
    createBeepSound(600, 0.1)
    setTimeout(() => createBeepSound(800, 0.1), 100)
    setTimeout(() => createBeepSound(1000, 0.2), 200)
  },
  error: () => {
    createBeepSound(200, 0.2)
    setTimeout(() => createBeepSound(150, 0.3), 200)
  },
  testPass: () => createBeepSound(1200, 0.15),
  gameWin: () => {
    const notes = [523, 659, 784, 1047] // C, E, G, C
    notes.forEach((freq, i) => {
      setTimeout(() => createBeepSound(freq, 0.2), i * 150)
    })
  }
}