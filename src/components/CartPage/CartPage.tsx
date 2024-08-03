'use client'
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import cartIcon from '@/assets/cart.png';
import Image from 'next/image';
import { createOrder } from '@/helpers/orders.helper';
import IProduct from '@/interfaces/IProduct';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const CartPage = () => {
    const [cart, setCart] = useState<IProduct[]>([]);
    const [totalCart, setTotalCart] = useState<number>(0);
    const router = useRouter();
    const {userData} = useAuth();

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            if (storedCart) {
                let totalCart = 0;
                storedCart.map((item: IProduct) => {
                    totalCart = totalCart + item.price;
                });
                setTotalCart(totalCart);
                setCart(storedCart);
            }
        }
    }, []);

    useEffect(() => {
        if(userData?.user.name) {
            userData?.user.name === undefined && router.push("/login")
        }
    }, [userData?.user])

    const handleClick = async () => {
        if (cart.length === 0) {
            Swal.fire({
                title: "El carrito está vacío",
                text: "Agrega productos al carrito para realizar una compra.",
                icon: "warning",
                width: 400,
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
            return;
        }
    
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Quieres proceder con la compra?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, comprar",
            cancelButtonText: "Cancelar",
            width: 400,
            padding: "2em",
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#f3f4f6',
            confirmButtonColor: '#4A1D96',
            customClass: {
                popup: 'custom-swal-popup',
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button'
            }
        });
        
    
        if (result.isConfirmed) {
            const idProducts = new Set(cart?.map((product) => product.id));
    
            await createOrder(Array.from(idProducts), userData?.token!);
    
            await Swal.fire({
                title: "Compra realizada con éxito",
                icon: 'success',
                width: 400,
                padding: "2em",
                background: 'rgba(0, 0, 0, 0.9)',
                color: '#f3f4f6',
                confirmButtonText: "OK",
                confirmButtonColor: '#4A1D96',
                customClass: {
                    confirmButton: 'swal-confirm-button'
                }
            });
    
            setCart([]);
            setTotalCart(0);
            localStorage.setItem("cart", "[]");
    
            router.push("/dashboard/orders");
        }
    };    

    const handleRemoveFromCart = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
        let updatedTotalCart = 0;
        updatedCart.map((item: IProduct) => {
            updatedTotalCart += item.price;
        });
        setTotalCart(updatedTotalCart);
    };

    return (
        <div className="w-full">
<div className="w-full">
    <h2 className="flex items-center justify-center bg-gradient-to-r from-purple-900 to-blue-800 text-white py-3 font-bold text-3xl rounded-none focus:outline-none mb-6">
        <div className="marquee-wrapper">
            <div className="marquee-content">
                <Image src={cartIcon} alt="Hot Sale 2024" width={24} height={24} className="mr-2" />
                <span>Aprovechá el Hot Sale 2024 • Ofertas, Promociones y Descuentos!</span>
                <Image src={cartIcon} alt="Hot Sale 2024" width={24} height={24} className="mr-2" />
                <span>Aprovechá el Hot Sale 2024 • Ofertas, Promociones y Descuentos!</span>
                <Image src={cartIcon} alt="Hot Sale 2024" width={24} height={24} className="mr-2" />
                <span>Aprovechá el Hot Sale 2024 • Ofertas, Promociones y Descuentos!</span>
            </div>
        </div>
    </h2>
</div>
            <div className="m-5">
                {cart && cart.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col">
                                <div className="relative w-full h-48">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {item.name}
                                    </h5>
                                    <div className="flex items-center mt-2 mb-4">
                                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                            {[...Array(4)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className="w-5 h-5 text-yellow-300"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                            <svg
                                                className="w-5 h-5 text-gray-200 dark:text-gray-600"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                            5.0
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                                        <p className="text-gray-500 dark:text-gray-400">Stock: {item.stock}</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="block text-center w-full text-white bg-gradient-to-r from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                                    >
                                    <span className="transition duration-300 hover:scale-105 inline-block">
                                    Remover del carrito ✘
                                    </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-[300px]">
                    <div className="w-full max-w-lg flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-6">
                    <svg className='opacity-20 mb-5' xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 16 16">
                        <path fill="black" d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4M4 5h10.7l-1.1 4l-8.4.9z" />
                    </svg>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tu carrito está vacío</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">No hay productos en tu carrito. Agrega algunos productos para proceder con la compra.</p>
                        <button
                            onClick={() => router.push("/")}
                            className="block text-center w-full text-white bg-gradient-to-r from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                        ◀ Volver a la tienda
                        </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full mt-6">
                {cart && cart.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 m-5">
                        <button
                            onClick={() => router.push("/")}
                            className="text-center text-white bg-gradient-to-l from-purple-800 to-blue-900 hover:bg-gradient-to-r focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-4 sm:mb-0"
                        >
                        <span className="transition duration-300 hover:scale-105 inline-block">
                        ◀ Ver más productos
                        </span>
                        </button>
                        <span className="duration-300 hover:scale-110 text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Total: ${totalCart}</span>
                        <button
                            onClick={handleClick}
                            className="text-center text-white bg-gradient-to-r from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                        <span className="transition duration-300 hover:scale-110 inline-block font-bold">
                        Finalizar Compra ▶
                        </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
