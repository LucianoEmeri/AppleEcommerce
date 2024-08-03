'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const ProfilePage = () => {
    const router = useRouter();
    const { userData } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userData?.user) {
            setLoading(false);
        } else {
            router.push("/");
        }
    }, [userData, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FaSpinner className="animate-spin text-4xl text-purple-900" />
            </div>
        );
    }

    return (
        <div className="bg-cover bg-center bg-[url('/images/image5.jpg')] min-h-screen">
            <div className="max-w-4xl mx-auto bg-white opacity-90 rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 mb-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden">
                        <img
                            src="https://yt3.googleusercontent.com/05lhMeAH6tZrPIUsp2yHNz3DwzhKbDUQcxcY0_qeXVyZttR_pktBzw0FcLUSR6D4fVqsEgL3ZO0=s900-c-k-c0x00ffffff-no-rj"
                            alt="Perfil"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-semibold mb-2">
                            Bienvenido, {userData?.user?.name || "Usuario"}
                        </h2>
                        <p className="text-gray-600">
                            Tu dirección: {userData?.user?.address || "No disponible"}
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-6">
                    <h3 className="text-xl font-semibold mb-4">Información de la Cuenta</h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between flex-wrap">
                            <span className="font-medium">Correo Electrónico:</span>
                            <span>{userData?.user?.email || "No disponible"}</span>
                        </li>
                        <li className="flex justify-between flex-wrap">
                            <span className="font-medium">Teléfono:</span>
                            <span>{userData?.user?.phone || "No disponible"}</span>
                        </li>
                        <li className="flex justify-between flex-wrap">
                            <span className="font-medium">Fecha de Registro:</span>
                            <span>{userData?.user?.registrationDate || "No disponible"}</span>
                        </li>
                    </ul>
                </div>

                <div className="border-t border-gray-300 pt-6 mt-6">
                    <h3 className="text-xl font-semibold mb-4">Actividad Reciente</h3>
                    <p className="text-gray-600">No hay actividad reciente.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
