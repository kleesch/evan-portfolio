// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    curtainClosed: false,
    // Set by a page to keep the curtain shut after navigation until its content is ready
    curtainHeld: false,
  }),
  getters: {
    curtainShut: state => state.curtainClosed || state.curtainHeld,
  },
})
