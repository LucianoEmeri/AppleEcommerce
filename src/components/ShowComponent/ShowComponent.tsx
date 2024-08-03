'use client'
import { usePathname } from 'next/navigation'
import React from 'react' 
import { ThemeProvider, Button } from "@material-tailwind/react";
export { ThemeProvider, Button };

const ShowComponent = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname()
  return (
    <ThemeProvider>
        {
          pathname !== "/login" && pathname !== "/register" && (
            children
          )
        }
    </ThemeProvider>
  )
}

export default ShowComponent
