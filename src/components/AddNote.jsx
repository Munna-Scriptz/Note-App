import React from 'react'
import { FaStickyNote } from 'react-icons/fa'

const AddNote = () => {
  return (
    <>
    <div className="relative w-[80%] max-w-2xl mx-auto bg-[#2d2e30] rounded-lg px-4 py-3 shadow-md">
        <div className="flex items-center">
          <FaStickyNote className="text-gray-500 mr-3" />
          <input type="text" placeholder="Take a note..." className="bg-transparent w-full outline-none dark:text-white"/>
          <button className="absolute top-0 right-0 bg-white h-full w-[110px] cursor-pointer text-[#202124] font-medium rounded-lg">
            Add Note
          </button>
        </div>
    </div>
    </>
  )
}

export default AddNote