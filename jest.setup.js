import { TextEncoder, TextDecoder } from 'util';
import 'whatwg-fetch'; // Polyfill para fetch y Response

// Configura globalmente para Jest
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// Mock de BroadcastChannel


global.BroadcastChannel = class {
    constructor() {
      this.onmessage = null;
    }
  
    postMessage(message) {
      if (this.onmessage) {
        this.onmessage({ data: message });
      }
    }
  
    close() {
      // No hace nada en este mock
    }
  };