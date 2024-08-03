"use client"

import { useState, useCallback, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"

interface ICarouselImageProps {
  id: number
  image: string
  href: string
  description1: string
  description2: string
  title: string
}

interface ICarouselProps {
  images: ICarouselImageProps[]
}

export default function Carousel({ images }: ICarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleButtonClick = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handlePrevClick = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    )
  }, [images.length])

  const handleNextClick = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    )
  }, [images.length])

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextClick()
    }, 4000)

    return () => {
      clearInterval(timer)
    }
  }, [handleNextClick])

  return (
    <div
      id="default-carousel"
      className="relative w-full hidden md:block"
      data-carousel="slide">
      <div className="relative h-56 overflow-hidden md:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? 'opacity-100 z-40' : 'opacity-0'
            }`}
            data-carousel-item>
            <Image
              src={img.image}
              className="absolute block w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
              width={1920}
              height={1080}
              quality={100}
            />

            <div className="absolute top-1/4 left-20 text-white">
              <p className="font-bold text-sm uppercase">{img.title}</p>
              <p className="text-3xl font-bold">{img.description1}</p>
              <p className="text-2xl mb-10 leading-none">
                {img.description2}
              </p>
              <Link
                href={img.href}
                className="text-white bg-gradient-to-r from-purple-900 to-blue-800 hover:bg-gradient-to-l focus:outline-none py-4 px-8 font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-white">
                <span className="transition duration-300 hover:scale-110 inline-block">
                  COMPRAR AHORA
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-40 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-purple-700' : 'bg-purple-900'
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => handleButtonClick(index)}></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-40 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={handlePrevClick}>
        <span className="inline-flex items-center justify-center w-10 h-10 group-hover:bg-tertiary/50 group-focus:ring-0 group-focus:outline-none bg-transparent">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180 opacity-80"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-40 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={handleNextClick}>
        <span className="inline-flex items-center justify-center w-10 h-10 group-hover:bg-tertiary/50 group-focus:ring-0 group-focus:outline-none bg-transparent">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180 opacity-80"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}
