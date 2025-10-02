import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../slice/LoginInfoSlice';
import deleteIcon from '../assets/images/deleteIcon.svg'
import editIcon from '../assets/images/editIcon.svg'
import noNotes from '../assets/images/noNotes.svg'

const Notes = () => {
  const db = getDatabase();
  const [noteItem , setNoteItem] = useState([])
  const [showText , setShowText] = useState('')
  // ----------------------------------------------Redux Hooks And Edit
  const currentUser = useSelector(state=>state.MyRedux.value)
  const dispatch = useDispatch()

  const handleEdit = (item)=>{
    dispatch(updateNote({notes: item.notes , updateStatus: true}))
    remove(ref(db , 'AllNotes/' + item.key))
  }
  // -------------------------------------------Read Notes from firebase 
  useEffect(()=>{
    onValue(ref(db , 'AllNotes/'), (snapshot) => {
      const myArray = []

      snapshot.forEach((item)=>{
        if(item.val().creatorId == currentUser?.uid){
          myArray.push({key: item.key , notes: item.val()})
        }
      })

      setNoteItem(myArray)
      if (myArray.length === 0) {
        setShowText(null);
      } else {
        setShowText("hasNotes");
      }
    });
  } , [currentUser?.uid])
  // ---------------------Delete Note-----------------
  const handleDel = (Data)=>{
    // ---------Adds notes to RemoveNotes 
    set(push(ref(db, 'removedNotes/')), {
      title: Data.notes.title,
      content: Data.notes.content,
      color: Data.notes.color,
      creatorId : currentUser?.uid
    });
    // ---------Delete Notes from home
    remove(ref(db , 'AllNotes/' + Data.key))
  }
  return (
    <>
    <div>
      {
        showText == null?
        <div className='flex flex-col items-center justify-center lg:h-[450px] h-[350px]'>
          <img src={noNotes} alt="Not found" />
          <h1 className='font-Poppins text-white font-medium md:text-2xl text-xl text-center'>You Don't have any notes Yet...</h1>
        </div>
        :
          noteItem?.length == 0?
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6'>
              <div className="skeleton-loader"></div>
              <div className="skeleton-loader"></div>
              <div className="skeleton-loader"></div>
              <div className="skeleton-loader"></div>
              <div className="skeleton-loader"></div>
            </div>
              :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
              {
                noteItem.map((item , i)=>(
                  <div key={i} className={`p-5 rounded-lg shadow hover:shadow-lg relative`} style={{ backgroundColor: item.notes.color }} >
                    <button onClick={()=>handleDel(item)} className='absolute top-4 right-4 cursor-pointer hover:bg-[#e0070780] duration-200 w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full flex items-center justify-center'>
                      <img className='w-[20px] sm:w-[24px]' src={deleteIcon} alt="delete" />
                    </button>
                    <button onClick={()=>handleEdit(item)} className='absolute top-4 right-12 sm:right-14 cursor-pointer hover:bg-[#cae00780] duration-200 w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full flex items-center justify-center'>
                      <img className='w-[20px] sm:w-[24px]' src={editIcon} alt="edit" />
                    </button>
                    <h3 className="font-bold mb-4 text-white text-sm sm:text-base">{item.notes.title}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">{item.notes.content}</p>
                  </div>
                ))
              }
            </div>
      }
    </div>
    </>
  )
}

export default Notes