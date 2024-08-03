import React from 'react'

const NotFoundPage = () => {
  return (
    <section
      className="flex items-center h-screen p-16 bg-cover bg-center w-full"
      style={{ backgroundImage: 'url("https://64.media.tumblr.com/506834a92d807507b4f46672a628002e/tumblr_pwhs4wgPW61wa5v4lo2_1280.jpg")' }}
    >
      <div className="container flex flex-col items-center">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-gray-100 text-shadow-1">
            <span className="sr-only">Error</span> 404
          </h2>
          <p className="text-2xl md:text-3xl text-gray-100 text-shadow-1">Ohhhh noooo!</p>
          <a
            href="/"
            className="px-8 py-4 text-xl font-semibold rounded bg-black text-gray-50 hover:text-gray-200"
          >
            <span className="transition duration-300 hover:scale-105 inline-block">
              Vuelve al inicio
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
