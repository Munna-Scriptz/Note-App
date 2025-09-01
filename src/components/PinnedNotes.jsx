import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../slice/LoginInfoSlice';
import pinIcon from '../assets/images/pinIcon.svg'
import regularIcon from '../assets/images/regularNotes.svg'
import deleteIcon from '../assets/images/deleteIcon.svg'
import editIcon from '../assets/images/editIcon.svg'

const PinnedNotes = () => {
    const db = getDatabase();
    const [noteItem , setNoteItem] = useState([])
    const [showText , setShowText] = useState('')
    // ----------------------------------------------Redux Hooks And Edit
    const currentUser = useSelector(state=>state.MyRedux.value)
    const dispatch = useDispatch()

    const handleEdit = (item)=>{
        dispatch(updateNote({notes: item.notes , updateStatus: true}))
        remove(ref(db , 'pinnedNotes/' + item.key))
    }
    // -------------------------------------Read Pinned Notes from firebase 
    useEffect(()=>{
    onValue(ref(db , 'pinnedNotes/'), (snapshot) => {
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
  // ---------------------Hide The Pin if pin notes arn't there

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
      remove(ref(db , 'pinnedNotes/' + Data.key))
    }
  return (
    <>
    <div className={`p-6 ${showText == null ? 'hidden' : 'visible' }`}>
        <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-3"><img className='w-[25px]' src={pinIcon} alt="notes" /> Pinned</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {
            noteItem.map((item , i)=>(
                <div key={i} className={`p-5 rounded-lg shadow hover:shadow-lg relative`} style={{ backgroundColor: item.notes.color }} >
                    <button onClick={()=>handleDel(item)} className='absolute top-4 right-4 cursor-pointer hover:bg-[#e0070780] duration-200 w-[40px] h-[40px] rounded-full flex items-center justify-center'>
                        <img className='w-[24px]' src={deleteIcon} alt="delete" />
                    </button>
                  <button onClick={()=>handleEdit(item)} className='absolute top-4 right-14 cursor-pointer hover:bg-[#cae00780] duration-200 w-[40px] h-[40px] rounded-full flex items-center justify-center'>
                    <img className='w-[24px]' src={editIcon} alt="edit" />
                  </button>
                  <h3 className="font-bold mb-4 text-white">{item.notes.title}</h3>
                  <p className="text-gray-300">{item.notes.content}</p>
                </div>
            ))
        }
        </div>
        <h2 className="text-white text-xl font-bold flex items-center gap-3"><img className='w-[35px]' src={regularIcon} alt="notes" /> Regular Notes</h2>
    </div>

    </>
  )
}

export default PinnedNotes