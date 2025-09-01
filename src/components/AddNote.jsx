import React, { useEffect, useState } from 'react'
import { FaPen, FaStickyNote } from 'react-icons/fa'
import { MdLabelOutline } from 'react-icons/md'
import pinIcon from '../assets/images/pinIcon.svg'
import crossIcon from '../assets/images/crossIcon.svg'
// ---------Firebase Import-------- 
import { getDatabase, push, ref, set } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { pinNote } from '../slice/LoginInfoSlice';

const AddNote = () => {
  const db = getDatabase();
  // ---------------Input TextArea--------------
  const [inpValue , setInpValue] = useState('') //note title
  const [noteContent , setNoteContent] = useState('')
  const [color , setColor] = useState('#2D2E30')
  const currentUser = useSelector(state=>state.MyRedux.value)
  const updateContent = useSelector(state=>state.MyRedux.updated)
  const [updateCng , setUpdateCng] = useState(false)
  const dispatch = useDispatch()
  const pinOrNot = useSelector(state=>state.MyRedux.pinned)
  const [isPin , setIsPin] = useState(false)
  console.log(isPin)
  // -------------------Update button------------------
  useEffect(()=>{
    setUpdateCng(updateContent?.updateStatus || false)
    setInpValue(updateContent?.notes?.title || '')
    setNoteContent(updateContent.notes?.content || '')
    setColor(updateContent?.notes?.color || '#2D2E30')
  }, [updateContent])

  // ---------------Firebase Data Write--------------
  const handleNotes = ()=>{
    set(push(ref(db, `${pinOrNot}`)), {
      title: inpValue,
      content: noteContent,
      color: color,
      creatorId : currentUser.uid
    });
    setInpValue('')
    setNoteContent('')
  }
  // ---------------Notes pin--------------
  const handlePin = ()=>{
    setIsPin(true)
    dispatch(pinNote('pinnedNotes/'))
  }
  return (
    <>
    <div className="relative w-[80%] max-w-2xl mx-auto bg-primary rounded-lg px-4 py-3 shadow-md flex items-center justify-between">
      <div className='w-[500px]'>
        <div className="flex items-center">
          <FaStickyNote className="text-gray-500 mr-3" />
          <input value={inpValue || ''} onChange={(e)=>{setInpValue(e.target.value)}} type="text" placeholder="Take a note title..." className="bg-transparent w-full h-[40px] outline-none text-white"/>
        </div>
        <div className={`${!inpValue? 'hidden' : 'visible'} flex items-start mt-10 delay-75 duration-200`}>
          <FaPen className='text-gray-500 mr-3'/>
          <textarea value={noteContent || ''} onChange={(e)=>{setNoteContent(e.target.value)}} className='bg-transparent outline-none text-white overflow-x-hidden' onInput={(e)=>{e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";}} cols={55} placeholder='Your note...'></textarea>
        </div>
      </div>
      {
        updateCng == true?
        <button onClick={()=>{handleNotes() , setInpValue('') , setUpdateCng(false) , dispatch(pinNote('AllNotes/')), setIsPin(false)}} className="bg-white h-[40px] hover:bg-[#666666] hover:text-white hover:scale-[1.05] duration-[.3s] w-[140px] cursor-pointer text-[#202124] font-medium rounded-lg">Update Note</button>
        :
        <button onClick={()=>{handleNotes() , dispatch(pinNote('AllNotes/')), setIsPin(false)}} className="bg-white h-[40px] w-[140px] cursor-pointer text-[#202124] hover:bg-[#666666] hover:text-white hover:scale-[1.05] duration-[.3s] font-medium rounded-lg">Add Note</button>
      }
    </div>

    {/* ------------------Appear Color Div ------------------- */}
    <div className={`${!inpValue? 'hidden' : 'visible'} relative flex items-center justify-between w-[80%] max-w-2xl mx-auto duration-300 rounded-lg px-4 py-4 mt-5 shadow-md`} style={{ backgroundColor: color }} >
      <div className='flex items-center gap-3'>
        <span onClick={()=>{setColor('#3BA1FA')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#3BA1FA] cursor-pointer'></span>
        <span onClick={()=>{setColor('#2D2E30')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#2D2E30] cursor-pointer'></span>
        <span onClick={()=>{setColor('#FCC61D')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#FCC61D] cursor-pointer'></span>
        <span onClick={()=>{setColor('#EA5B6F')}} className='w-[20px] h-[20px] border-1 border-brand rounded-full bg-[#EA5B6F] cursor-pointer'></span>
        <div className='ml-2'>
          <label htmlFor='colors' className='text-white text-2xl cursor-pointer'><IoColorPaletteOutline /></label>
          <input onChange={(e)=>setColor(e.target.value)} className='hidden' type="color" id="colors" />
        </div>
      </div>
      <div className='flex items-center gap-2 text-white'>
        {
          isPin?
          <button onClick={()=>{handlePin() , setIsPin(false), dispatch(pinNote('AllNotes//'))}} className='cursor-pointer hover:bg-[#3ba1fa9f] duration-200 w-[35px] h-[35px] flex items-center justify-center rounded-full'>
            <img className='w-[20px]' src={crossIcon} alt="pin" />
          </button>
          :
          <button onClick={()=>handlePin()} className='cursor-pointer hover:bg-[#3ba1fa9f] duration-200 w-[35px] h-[35px] flex items-center justify-center rounded-full'>
            <img className='w-[22px]' src={pinIcon} alt="pin" />
          </button>

        }
        <button className='cursor-pointer hover:bg-[#ea5b6e8c] duration-200 w-[35px] h-[35px] flex items-center justify-center rounded-full'><MdLabelOutline size={24}/></button>
      </div>
    </div>
    </>
  )
}

export default AddNote