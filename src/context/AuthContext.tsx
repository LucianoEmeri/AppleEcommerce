'use client'
import { IUserSession, IOrder } from "@/interfaces/Types";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextProps {
    userData: IUserSession | null;
    setUserData: (userData: IUserSession | null) => void;
    logout: () => void;
    orders: IOrder[];
    setOrders: (orders: IOrder[]) => void;
    removeOrder: (orderId: string) => void;
    getToken: () => string | undefined;  // Nueva función para obtener el token
}

export const AuthContext = createContext<AuthContextProps>({
    userData: null,
    setUserData: () => {},
    logout: () => {},
    orders: [],
    setOrders: () => {},
    removeOrder: () => {},
    getToken: () => undefined,  // Inicialmente retorna undefined
});

export interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<IUserSession | null>(null);
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        if (userData) {
            localStorage.setItem("userSession", JSON.stringify({ token: userData.token, user: userData.user }));
        }
    }, [userData]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const storedUserData = localStorage.getItem("userSession");
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }
    }, []);

    const logout = () => {
        setUserData(null);
        localStorage.removeItem("userSession");
    };

    const removeOrder = (orderId: string) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    };

    const getToken = () => {
        return userData?.token;
    };

    return (
        <AuthContext.Provider value={{ userData, setUserData, logout, orders, setOrders, removeOrder, getToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
