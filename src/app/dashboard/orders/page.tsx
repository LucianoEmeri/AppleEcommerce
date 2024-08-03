'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Swal from "sweetalert2";
import { useAuth } from '@/context/AuthContext'; // Importa el contexto

const Orders = () => {
  const { userData, orders, removeOrder } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/login");
    }
  }, [userData, router]);

  const handleCancelOrder = (orderId: number) => {
    Swal.fire({
      title: `¿Estás seguro de que deseas cancelar la orden ${orderId}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
      confirmButtonColor: '#4A1D96',
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#f3f4f6',
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina la orden usando el contexto
        removeOrder(orderId);

        Swal.fire({
          title: '¡Orden cancelada!',
          text: 'Tu orden ha sido cancelada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#4A1D96',
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#f3f4f6'
        });
      }
    });
  }

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="bg-white shadow-lg rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex-1">
              <p className="text-gray-700 text-lg font-semibold">{new Date(order.date).toLocaleDateString()}</p>
              <p className="text-gray-500">Estado: {order.status.toLocaleUpperCase()}</p>
            </div>
            <button
              onClick={() => handleCancelOrder(order.id)}
              className="bg-gradient-to-r from-purple-900 to-blue-800 text-white hover:bg-gradient-to-l focus:outline-none py-2 px-4 font-bold uppercase text-xs rounded transition duration-300 transform hover:scale-105 mt-2 md:mt-0 md:ml-4 w-full md:w-auto"
            >
              <span className="transition duration-300 hover:scale-105 inline-block">
                Cancelar orden
              </span>
            </button>
          </div>
        ))
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 text-center">
          <p className="text-black-700 mb-4">Aún no tienes ninguna orden</p>
          <Link href="/">
            <button
              className="bg-gradient-to-r from-purple-900 to-blue-800 text-white hover:bg-gradient-to-l focus:outline-none py-3 px-6 font-bold uppercase text-xs rounded transition duration-300 transform hover:scale-105 w-full md:w-auto"
            >
              <span className="transition duration-300 hover:scale-105 inline-block">
                Comprar productos
              </span>
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Orders;
