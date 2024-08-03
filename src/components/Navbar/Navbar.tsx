"use client";
import React, { useState, useEffect, useRef } from "react";
import Logo from "@/assets/Logo.png";
import Link from "next/link";
import Cart from "@/assets/cart.png";
import Profile from "@/assets/profile.png";
import Menu from "@/assets/menu.png";
import SearchIcon from "@/assets/search-icon.png";
import LoginIcon from "@/assets/login.png";
import categoriesToPreload from "@/helpers/categories";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const products = [
    { id: 1, name: 'iPhone', categoryId: 1 },
    { id: 2, name: 'Mac', categoryId: 2 },
    { id: 3, name: 'iPad', categoryId: 3 },
    { id: 4, name: 'Watch', categoryId: 4 },
    { id: 5, name: 'AirPods', categoryId: 5 },
    { id: 6, name: 'Accesorios', categoryId: 6 },
];

const Navbar = () => {
    const {userData} = useAuth()
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowSize, setWindowSize] = useState([1200, 800]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
    const [showCategories, setShowCategories] = useState(window.innerWidth >= 720);
    const searchDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchTerm) {
            const results = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const windowSizeHandler = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
        if (window.innerWidth >= 720) {
            setIsMenuOpen(false);
            setShowCategories(true);
        } else {
            setShowCategories(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", windowSizeHandler);
        return () => {
            window.removeEventListener("resize", windowSizeHandler);
        };
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchTerm) {
            window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        }
    };

    const handleSearchClick = () => {
        handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedProductIndex((prevIndex) => (prevIndex + 1) % filteredProducts.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedProductIndex((prevIndex) => (prevIndex - 1 + filteredProducts.length) % filteredProducts.length);
        } else if (event.key === "Enter") {
            event.preventDefault();
            const selectedProduct = filteredProducts[selectedProductIndex];
            if (selectedProduct) {
                window.location.href = `/products/${selectedProduct.id}`;
            } else {
                handleSearchSubmit(event as React.FormEvent<HTMLFormElement>);
            }
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setShowCategories(!showCategories);
    };

    return (
        <nav className="sticky top-0 z-50 bg-black p-4 font-light shadow-md w-full">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/">
                    <img
                        src={Logo.src}
                        alt="Logo"
                        className="h-8 md:h-10 transition duration-300 hover:scale-105"
                    />
                </Link>

                <div className="relative flex-1 max-w-md mx-4">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Buscar un producto..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            className="w-full px-5 py-2 bg-gray-200 text-black placeholder-gray-900 rounded-full border border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-900 transition duration-300"
                        />
                        {searchTerm && filteredProducts.length > 0 && (
                            <div
                                ref={searchDropdownRef}
                                className="absolute top-full left-0 w-full bg-black text-white shadow-lg rounded-b-lg mt-1 z-10 opacity-85"
                            >
                                <div className="max-h-60 overflow-y-auto">
                                    <ul>
                                        {filteredProducts.map((product, index) => (
                                            <li
                                                key={product.id}
                                                className={`p-2 transition duration-300 rounded-md ${
                                                    index === selectedProductIndex ? 'bg-purple-900' : 'hover:bg-purple-950'
                                                }`}
                                            >
                                                <Link href={`/products/${product.id}`} className="block">
                                                    {product.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleSearchClick}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
                        >
                            <img
                                src={SearchIcon.src}
                                alt="Search"
                                className="w-6 opacity-40"
                            />
                        </button>
                    </form>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6">
                    {userData && userData.token ? (
                        <>
                            <Link href="/dashboard" className="text-gray-200 hover:text-[#fff] transition duration-300 hover:scale-105">
                                <img
                                    src={Profile.src}
                                    alt="Profile"
                                    className="w-6 md:w-8"
                                />
                            </Link>
                            <Link href="/cart" className="text-gray-200 hover:text-[#fff] transition duration-300 hover:scale-105">
                                <img
                                    src={Cart.src}
                                    alt="Cart"
                                    className="w-6 md:w-8 mb-1"
                                />
                            </Link>
                        </>
                    ) : (
                        <Link className="text-white" href="/login">
                            <img
                                src={LoginIcon.src}
                                alt="Iniciar sesión"
                                className="w-6 md:w-8"
                            />
                        </Link>
                    )}

                    <button
                        onClick={toggleMenu}
                        className="text-gray-200 hover:text-[#fff] transition duration-300 hover:scale-105"
                    >
                        <img
                            src={Menu.src}
                            alt="Menu"
                            className="w-6 md:w-8"
                        />
                    </button>
                </div>
            </div>

            {showCategories && (
                <div className="w-full flex flex-row items-center gap-4 justify-around mt-4 text-white">
                    {categoriesToPreload && categoriesToPreload.length > 0 ? (
                        categoriesToPreload.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products/${category.id}`}
                                className="transition duration-300 hover:scale-105"
                            >
                                <label className="text-sm md:text-base cursor-pointer">
                                    {category.name}
                                </label>
                            </Link>
                        ))
                    ) : (
                        <p className="text-sm md:text-base">No hay categorías disponibles</p>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
