import React, { useState } from 'react'
import { FaPen, FaStickyNote } from 'react-icons/fa'
import { LuPin } from 'react-icons/lu'
import { MdLabelOutline } from 'react-icons/md'

// ---------Firebase Import-------- 
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

const AddNote = () => {
  // ---------------Input TextArea--------------
  const [inpValue , setInpValue] = useState('')
  const [noteContent , setNoteContent] = useState('')
  const [color , setColor] = useState('#2D2E30')
  const currentUser = useSelector(state=>state.MyRedux.value)
  // ---------------Firebase--------------
  const db = getDatabase();

  const handleNotes = ()=>{
    set(push(ref(db, 'AllNotes/')), {
      title: inpValue,
      content: noteContent,
      color: color,
      creatorId : currentUser.uid
    });
    setInpValue('')
    setNoteContent('')
  }

  return (
    <>
    <div className="relative w-[80%] max-w-2xl mx-auto bg-primary rounded-lg px-4 py-3 shadow-md flex items-center justify-between">
      <div className='w-[500px]'>
        <div className="flex items-center">
          <FaStickyNote className="text-gray-500 mr-3" />
          <input value={inpValue} onChange={(e)=>{setInpValue(e.target.value)}} type="text" placeholder="Take a note title..." className="bg-transparent w-full h-[40px] outline-none text-white"/>
        </div>
        <div className={`${!inpValue? 'hidden' : 'visible'} flex items-start mt-10 delay-75 duration-200`}>
          <FaPen className='text-gray-500 mr-3'/>
          <textarea value={noteContent} onChange={(e)=>{setNoteContent(e.target.value)}} className='bg-transparent outline-none text-white overflow-x-hidden' onInput={(e)=>{e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";}} cols={55} placeholder='Your note...'></textarea>
        </div>
      </div>
      <button onClick={()=>{handleNotes()}} className="bg-white h-[40px] w-[140px] cursor-pointer text-[#202124] font-medium rounded-lg">Add Note</button>
    </div>

    {/* ------------------Appear Color Div ------------------- */}
    <div className={`${!inpValue? 'hidden' : 'visible'} relative flex items-center justify-between w-[80%] max-w-2xl mx-auto duration-300 bg-[${color}] rounded-lg px-4 py-4 mt-5 shadow-md`}>
      <div className='flex items-center gap-3'>
        <span onClick={()=>{setColor('white')}} className='w-[20px] h-[20px]   border-1 border-brand rounded-full bg-[white] cursor-pointer'></span>
        <span onClick={()=>{setColor('#3BA1FA')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#3BA1FA] cursor-pointer'></span>
        <span onClick={()=>{setColor('#2D2E30')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#2D2E30] cursor-pointer'></span>
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