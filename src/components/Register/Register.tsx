'use client'
import { register } from '@/helpers/auth.helper';
import { validateRegisterForm } from '@/helpers/validate';
import { IRegisterError, IRegisterProps } from '@/interfaces/Types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Register = () => {
    const router = useRouter();
    const initialState = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
    }
    const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
    const [errors, setErrors] = useState<IRegisterError>(initialState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataUser({
            ...dataUser,
            [name]: value
        });
        
        const fieldErrors = validateRegisterForm({
            ...dataUser,
            [name]: value
        });
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: fieldErrors[name]
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        const errors = validateRegisterForm(dataUser);
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
            await register(dataUser);
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
            router.push("/login");
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
        <form 
            className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center py-6 px-4" 
            style={{ backgroundImage: 'url(/images/image4.jpg)' }} 
            onSubmit={handleSubmit}
        >
            <div className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Registro</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Tu correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={dataUser.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="tucorreo@gmail.com"
                        required
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Tu contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={dataUser.password}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="••••••••"
                        required
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Tu nombre</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={dataUser.name}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Luciano Emerí"
                        required
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Tu dirección</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={dataUser.address}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Cerrito, Entre Ríos"
                        required
                    />
                    {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Tu teléfono</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={dataUser.phone}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="3435049487"
                        required
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-gradient-to-r from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    <span className="transition duration-300 hover:scale-110 inline-block">
                        Registrate
                    </span>
                </button>
                <div className="mt-4 text-sm font-medium text-center text-gray-500">
                    ¿Ya tienes una cuenta? <a href="/login" className="text-blue-700 hover:underline">Iniciar sesión</a>
                </div>
            </div>
        </form>
    );
};

export default Register;
