import React from 'react'

const Footer = () => {
  return (
    <div className="text-center text-gray-500 py-4 text-sm">
      &copy; {new Date().getFullYear()} Seraph. All rights reserved.
    </div>
  )
}

export default Footer