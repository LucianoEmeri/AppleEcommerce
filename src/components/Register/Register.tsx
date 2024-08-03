'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useAuth } from '@/context/AuthContext';
import { IRegisterError, IRegisterProps } from '@/interfaces/Types';
import { validateRegisterForm } from '@/helpers/validate';

const Register = () => {
    const router = useRouter();
    const { registerUser, registerErrors, setRegisterErrors } = useAuth();
    const initialState: IRegisterProps = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
    };
    const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataUser(prevDataUser => ({
            ...prevDataUser,
            [name]: value
        }));

        const fieldErrors = validateRegisterForm({
            ...dataUser,
            [name]: value
        });

        // Asegúrate de que name es una clave válida de IRegisterError
        setRegisterErrors(prevErrors => ({
            ...prevErrors,
            [name as keyof IRegisterError]: fieldErrors[name as keyof IRegisterError] || ""
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        const errors = validateRegisterForm(dataUser);
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
            await registerUser(dataUser);
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
            className="flex flex-col space-y-4 p-6" 
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={dataUser.name}
                onChange={handleChange}
                className="p-2 border rounded"
            />
            {isSubmitted && registerErrors.name && <p className="text-red-600">{registerErrors.name}</p>}
            
            <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={dataUser.email}
                onChange={handleChange}
                className="p-2 border rounded"
            />
            {isSubmitted && registerErrors.email && <p className="text-red-600">{registerErrors.email}</p>}

            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={dataUser.password}
                onChange={handleChange}
                className="p-2 border rounded"
            />
            {isSubmitted && registerErrors.password && <p className="text-red-600">{registerErrors.password}</p>}

            <input
                type="text"
                name="address"
                placeholder="Dirección"
                value={dataUser.address}
                onChange={handleChange}
                className="p-2 border rounded"
            />
            {isSubmitted && registerErrors.address && <p className="text-red-600">{registerErrors.address}</p>}

            <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={dataUser.phone}
                onChange={handleChange}
                className="p-2 border rounded"
            />
            {isSubmitted && registerErrors.phone && <p className="text-red-600">{registerErrors.phone}</p>}

            <button
                type="submit"
                className="p-2 bg-purple-600 text-white rounded"
            >
                Registrarse
            </button>
        </form>
    );
};

export default Register;
