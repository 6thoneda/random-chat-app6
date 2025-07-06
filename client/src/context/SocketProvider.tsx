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
            const socketUrl = import.meta.env.VITE_API_SERVER_URL || 
                `ws://${window.location.hostname.replace(/--\d+--/, '--80--')}`;
            
            const newSocket = io(socketUrl, {
                transports: ['websocket', 'polling'],
                secure: false,
                timeout: 20000,
                forceNew: true
            });

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
            });

            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            newSocket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });

            setSocket(newSocket);

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