declare global {
  interface Window {
    // Add your custom window properties here
    // Examples:
    env?: Record<string, string>;
    config?: {
      apiUrl?: string;
      debug?: boolean;
    };
  }
}

export {};
