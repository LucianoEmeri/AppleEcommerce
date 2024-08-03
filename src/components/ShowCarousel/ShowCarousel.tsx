'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Carousel from '../Carousel/Carousel'
import Image1 from '../../../public/images/image1.jpg'
import Image2 from '../../../public/images/image2.jpg'

const ShowCarousel = () => {
  const pathname = usePathname()

  const validPaths = ['/']

  if (!validPaths.includes(pathname)) {
    return null
  }

  return (
    <Carousel 
      images={[
        { id: 1, image: Image1.src, href: "/products/1", description1: "Diseñado para ser amado",
        description2: "El smartphone con la mejor cámara del mercado", title: "iPhone"},
        
        { id: 2, image: Image2.src, href: "/products/2", description1: "Si puedes soñarlo, Mac puede hacerlo",
        description2: "Sorprendentemente delgado y rápido para que puedas trabajar, jugar o crear en cualquier lugar.", title: "Mac"}
      ]}
    />
  )
}

export default ShowCarousel