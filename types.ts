// FIX: Populating types.ts with necessary type definitions.
export enum AppState {
  MENU,
  CHATTING,
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export type Feature = 'KNOWLEDGE_BASE' | 'CREATIVE_WRITING' | 'TROUBLESHOOTING' | 'INSPIRATION_BOT' | 'CODE_ASSISTANT' | 'MATH_SOLVER';