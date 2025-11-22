import { useEffect, useState, useCallback } from 'react';

interface WebSocketData {
  type: string;
  data: {
    furnaces: any[];
    sensors: any[];
    kpis: any[];
    timestamp: string;
  };
}

export function useWebSocket() {
  const [data, setData] = useState<WebSocketData['data'] | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      try {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log('WebSocket connected');
          setIsConnected(true);
          setError(null);
        };

        ws.onmessage = (event) => {
          try {
            const message: WebSocketData = JSON.parse(event.data);
            if (message.type === 'update') {
              setData(message.data);
            }
          } catch (err) {
            console.error('Error parsing WebSocket message:', err);
          }
        };

        ws.onerror = (event) => {
          console.error('WebSocket error:', event);
          setError('Connection error');
          setIsConnected(false);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
          
          // Attempt to reconnect after 3 seconds
          reconnectTimeout = setTimeout(() => {
            console.log('Attempting to reconnect...');
            connect();
          }, 3000);
        };
      } catch (err) {
        console.error('Error creating WebSocket:', err);
        setError('Failed to connect');
      }
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  return { data, isConnected, error };
}
