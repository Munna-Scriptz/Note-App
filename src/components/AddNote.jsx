import React, { useState } from 'react'
import { FaStickyNote } from 'react-icons/fa'
import { LuPin } from 'react-icons/lu'
import { MdLabelOutline } from 'react-icons/md'

const AddNote = () => {

  const [inpValue , setInpValue] = useState('')
  const [color , setColor] = useState('white')
  console.log(color)

  return (
    <>
    <div className="relative w-[80%] max-w-2xl mx-auto bg-primary rounded-lg px-4 py-3 shadow-md">
      <div className="flex items-center">
        <FaStickyNote className="text-gray-500 mr-3" />
        <input onChange={(e)=>{setInpValue(e.target.value)}} type="text" placeholder="Take a note..." className="bg-transparent w-full outline-none dark:text-white"/>
        <button className="absolute top-0 right-0 bg-white h-full w-[110px] cursor-pointer text-[#202124] font-medium rounded-lg">Add Note</button>
      </div>
    </div>

    {/* ------------------Appear Color Div ------------------- */}
    <div className={`relative flex items-center justify-between w-[80%] max-w-2xl mx-auto duration-300 bg-[${color}] rounded-lg px-4 py-4 mt-5 shadow-md`}>
      <div className='flex items-center gap-3'>
        <span onClick={()=>{setColor('white')}} className='w-[20px] h-[20px]   border-1 border-brand rounded-full bg-[white] cursor-pointer'></span>
        <span onClick={()=>{setColor('#3BA1FA')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#3BA1FA] cursor-pointer'></span>
        <span onClick={()=>{setColor('#E62727')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#E62727] cursor-pointer'></span>
        <span onClick={()=>{setColor('#FCC61D')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#FCC61D] cursor-pointer'></span>
        <span onClick={()=>{setColor('#EA5B6F')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#EA5B6F] cursor-pointer'></span>
      </div>
      <div className='flex items-center gap-3'>
        <div className='cursor-pointer'><LuPin size={22}/></div>
        <div className='cursor-pointer'><MdLabelOutline size={24}/></div>
      </div>
    </div>
    </>
  )
}

export default AddNote