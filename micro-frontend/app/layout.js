// app/layout.js
import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Micro Frontend',
  description: 'User registration microservice frontend',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <div className=" flex  bg-gray-100 "> */}
          <div className="font-sans p-6 bg-white shadow-md rounded-lg">
            {children}
          </div>
        {/* </div> */}
      </body>
    </html>
  )
}
