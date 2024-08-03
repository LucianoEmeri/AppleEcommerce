import React from 'react';
import ICardProps from '@/components/Card/types';

const Card: React.FC<ICardProps> = ({ name, price, image, stock }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow flex flex-col justify-between">
      <div className="overflow-hidden">
        <img
          className="w-full h-48 object-contain rounded-t-lg"
          src={image}
          alt={name}
        />
      </div>
      <div className="px-6 pb-6 flex-grow mt-5">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <div className="flex items-center mt-2 mb-4">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(4)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <svg
              className="w-4 h-4 text-gray-200 dark:text-gray-600"
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
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${price}</span>
          <p className="text-gray-500 dark:text-gray-400">Stock: {stock}</p>
        </div>
      </div>
      <div className="px-6 pb-6">
        <p
          href="#"
          className="block text-center w-full text-white bg-gradient-to-r from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 "
        >
        <span className="transition duration-300 hover:scale-105 inline-block">
          Detalle del producto
        </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
