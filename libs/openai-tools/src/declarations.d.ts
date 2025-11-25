import type { OpenAiGlobals } from './lib/types';

declare global {
  interface Window {
    openai: {
      // API methods
      callTool: (name: string, args: Record<string, unknown>) => Promise<{ result: string }>;
      requestClose: () => void;
      sendFollowUpMessage: (args: { prompt: string }) => Promise<void>;
      openExternal: (payload: { href: string }) => void;
      requestDisplayMode: (args: { mode: 'pip' | 'inline' | 'fullscreen' }) => Promise<{ mode: 'pip' | 'inline' | 'fullscreen' }>;
      setWidgetState: (state: Record<string, unknown>) => Promise<void>;
    } & OpenAiGlobals;
    
    // Other custom window properties
    env?: Record<string, string>;
    config?: {
      apiUrl?: string;
      debug?: boolean;
    };
  }
}

export {};
