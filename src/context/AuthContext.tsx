'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ICategory from '@/interfaces/ICategory';
import { getCategories } from '@/helpers/categories.helper';
import { IUserSession, IOrder, IRegisterProps, IRegisterError } from '@/interfaces/Types';
import { register } from '@/helpers/auth.helper';
import { validateRegisterForm } from '@/helpers/validate';
import Swal from 'sweetalert2';
import IProduct from '@/interfaces/IProduct';

interface AuthContextProps {
    userData: IUserSession | null;
    setUserData: (userData: IUserSession | null) => void;
    logout: () => void;
    orders: IOrder[];
    setOrders: (orders: IOrder[]) => void;
    removeOrder: (orderId: number) => void;
    categories: ICategory[];
    products: IProduct[];
    setProductsByCategory: (categoryId: number) => void;
    registerUser: (data: IRegisterProps) => Promise<void>; // Método para registro
    registerErrors: IRegisterError; // Errores de registro
    setRegisterErrors: React.Dispatch<React.SetStateAction<IRegisterError>>; // Setter para errores de registro
}

export const AuthContext = createContext<AuthContextProps>({
    userData: null,
    setUserData: () => {},
    logout: () => {},
    orders: [],
    setOrders: () => {},
    removeOrder: () => {},
    categories: [],
    products: [],
    setProductsByCategory: () => {},
    registerUser: async () => {},
    registerErrors: {},
    setRegisterErrors: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<IUserSession | null>(null);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [registerErrors, setRegisterErrors] = useState<IRegisterError>({});

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesFromDB = await getCategories();
                setCategories(categoriesFromDB);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Suponiendo que tienes una lista de categorías precargadas
                setCategories([]); // Cambia por categoriesToPreload si la tienes
            }
        };

        fetchCategories();
    }, []);

    const logout = () => {
        setUserData(null);
        localStorage.removeItem("userSession");
    };

    const removeOrder = (orderId: number) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    };

    const setProductsByCategory = (categoryId: number) => {
        // Implementa la lógica para obtener productos basados en categoryId
        const fetchedProducts: IProduct[] = []; // Simula una llamada para obtener productos
        setProducts(fetchedProducts);
    };

    const registerUser = async (data: IRegisterProps) => {
        const errors = validateRegisterForm(data);
        setRegisterErrors(errors);

        if (Object.values(errors).some(error => error)) {
            Swal.fire({
                title: "Error",
                text: "Por favor, corrige los errores en el formulario.",
                icon: "error",
                width: 350,
                padding: "2em",
                background: 'rgba(0, 0, 0, 0.9)', 
                color: '#f3f4f6',
                confirmButtonText: "OK",
                confirmButtonColor: '#4A1D96',
                customClass: {
                    confirmButton: 'swal-confirm-button'
                }
            });
            return;
        }

        try {
            await register(data);
            Swal.fire({
                title: "Te has registrado correctamente",
                icon: "success",
                width: 350,
                padding: "2em",
                background: 'rgba(0, 0, 0, 0.9)', 
                color: '#f3f4f6',
                confirmButtonText: "OK",
                confirmButtonColor: '#4A1D96',
                customClass: {
                    confirmButton: 'swal-confirm-button'
                }
            });
            // Suponiendo que rediriges a la página de inicio de sesión
            // Aquí deberías redirigir al usuario a la página de inicio de sesión
        } catch (error: any) {
            Swal.fire({
                title: "Error",
                text: "No se pudo completar el registro. Por favor, inténtalo de nuevo.",
                icon: "error",
                width: 350,
                padding: "2em",
                background: 'rgba(0, 0, 0, 0.9)', 
                color: '#f3f4f6',
                confirmButtonText: "OK",
                confirmButtonColor: '#4A1D96',
                customClass: {
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    };

    return (
        <AuthContext.Provider value={{ userData, setUserData, logout, orders, setOrders, removeOrder, categories, products, setProductsByCategory, registerUser, registerErrors, setRegisterErrors }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
