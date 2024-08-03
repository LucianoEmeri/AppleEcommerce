'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import Image from 'next/image';
import profileIcon from '@/assets/profile2.png';
import ordersIcon from '@/assets/order.png';
import logoutIcon from '@/assets/logout.png';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { userData, setUserData } = useAuth();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de que quieres cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#4A1D96',
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#f3f4f6',
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "¡Has cerrado sesión!",
        text: "Te hemos redirigido a la página de inicio.",
        icon: "success",
        width: 350,
        padding: "2em",
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#f3f4f6',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#4A1D96',
        customClass: {
          confirmButton: 'swal-confirm-button'
        }
      });

      // Limpiar el estado de la sesión
      setUserData(null);
      localStorage.removeItem('userSession');
      router.push("/");
    }
  };

  return (
    <div className="text-black flex flex-col">
      <nav className="shadow-md border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap justify-center items-center p-4 space-y-2 md:space-y-0 md:space-x-4">

          <Link
            href="/dashboard"
            className="flex items-center bg-gradient-to-r from-purple-900 to-blue-800 text-white py-3 px-6 font-bold uppercase text-xs rounded hover:bg-gradient-to-l focus:outline-none transition duration-300 w-full md:w-auto"
          >
            <span className="flex items-center transition duration-100 hover:scale-110 w-full">
              <Image src={profileIcon} alt="Mi Perfil" width={20} height={20} className="mr-2" />
              Mi Perfil
            </span>
          </Link>

          <Link
            href="/dashboard/orders"
            className="flex items-center bg-gradient-to-r from-purple-900 to-blue-800 text-white py-3 px-6 font-bold uppercase text-xs rounded hover:bg-gradient-to-l focus:outline-none transition duration-300 w-full md:w-auto"
          >
            <span className="flex items-center transition duration-100 hover:scale-110 w-full">
              <Image src={ordersIcon} alt="Mis Pedidos" width={20} height={20} className="mr-2" />
              Mis Pedidos
            </span>
          </Link>

          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="flex items-center bg-gradient-to-r from-purple-900 to-blue-800 text-white py-3 px-6 font-bold uppercase text-xs rounded hover:bg-gradient-to-l focus:outline-none transition duration-300 w-full md:w-auto"
          >
            <span className="flex items-center transition duration-100 hover:scale-110 w-full">
              <Image src={logoutIcon} alt="Cerrar Sesión" width={20} height={20} className="mr-2" />
              Cerrar Sesión
            </span>
          </Link>

        </div>
      </nav>
      <main className="container mx-auto p-8 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
