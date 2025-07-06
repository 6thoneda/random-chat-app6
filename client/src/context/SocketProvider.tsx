import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

interface ISocketContext {
    socket: Socket | null;
    setSocket: (socket: Socket | null) => void;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if(!context){
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}

export const SocketProvider = ({children} : {children: ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!socket) {
            // Construct the correct server URL for the WebContainer environment
            const hostname = window.location.hostname;
            const socketUrl = hostname.includes('webcontainer') 
                ? `http://${hostname.replace(/--\d+--/, '--80--')}`
                : 'http://localhost:8000';
            
            console.log('Connecting to socket server:', socketUrl);
            
            const newSocket = io(socketUrl, {
                transports: ['polling', 'websocket'], // Try polling first
                timeout: 10000,
                forceNew: true,
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: 3,
                reconnectionDelay: 1000,
            });

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
                setSocket(newSocket);
            });

            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            newSocket.on('connect_error', (error) => {
                console.log('Socket connection error:', error.message);
                // Don't throw error, just log it
            });

            // Don't set socket immediately, wait for connection
            return () => {
                if (newSocket && newSocket.connected) {
                    newSocket.close();
                }
            };
        }
    }, [socket]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (socket && socket.connected) {
                socket.close();
            }
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>
    )
}