'use client'
import { useAuth } from '@/context/AuthContext';
import { login } from '@/helpers/auth.helper';
import { validateLoginForm } from '@/helpers/validate';
import { ILoginError, ILoginProps } from '@/interfaces/Types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Login = () => {
    const router = useRouter();
    const initialState = {
        email: "",
        password: "",
    };
    const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
    const {setUserData} = useAuth()
    const [errors, setErrors] = useState<ILoginError>(initialState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataUser({
            ...dataUser,
            [name]: value
        });

        const newErrors = { ...errors };
        if (name === 'email') {
            newErrors.email = validateLoginForm({ ...dataUser, email: value }).email;
        } else if (name === 'password') {
            newErrors.password = validateLoginForm({ ...dataUser, password: value }).password;
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        const errors = validateLoginForm(dataUser);
        setErrors(errors);

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
            const response = await login(dataUser);
            const {token, user} = response;
            setUserData({token, user})
            Swal.fire({
                title: "Has iniciado sesión correctamente",
                text: "Serás redirigido a la página de inicio.",
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
            }).then(() => {
                router.push("/");
            });
        } catch (error: any) {
            Swal.fire({
                title: "Error",
                text: "No se pudo iniciar sesión. Por favor, inténtalo de nuevo.",
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
        <form 
            className="min-h-screen flex flex-col justify-center items-center px-4 md:px-0 bg-cover bg-center" 
            style={{ backgroundImage: 'url(/images/image3.jpg)' }} 
            onSubmit={handleSubmit}
        >
            <div className="w-full max-w-xs md:max-w-md p-8 bg-white bg-opacity-80 border border-gray-200 rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Iniciar sesión</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={dataUser.email}
                        onChange={handleChange}
                        className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                        placeholder="tucorreo@gmail.com"
                        required
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={dataUser.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                        required
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>
                <div className="flex items-center mb-6">
                    <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recuérdame</label>
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-gradient-to-r from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    <span className="transition duration-300 hover:scale-110 inline-block">
                        Ingresar
                    </span>
                </button>
                <div className="mt-4 text-sm font-medium text-center text-gray-500 dark:text-gray-300">
                    ¿No estás registrado? <a href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Crear cuenta</a>
                </div>
            </div>
        </form>
    );
};

export default Login;
