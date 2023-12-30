interface Window {
  electronAPI: {
    on: (channel: string, callback: (...args: any[]) => void) => void;
    off: (channel: string, callback: (...args: any[]) => void) => void;
    send: (channel: string, args?: any) => void;
  };
}
