import React from 'react'
import { FaPlus } from 'react-icons/fa'

const FloatingButton = () => {
  return (
    <>
    <button className="fixed bottom-6 right-6 cursor-pointer bg-[#fbbc04] hover:bg-yellow-500 text-white rounded-full p-4 shadow-lg transition">
        <FaPlus size={22} />
    </button>
    </>
  )
}

export default FloatingButton