import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";


const Notes = () => {
  const db = getDatabase();
  const [noteItem , setNoteItem] = useState([])

  useEffect(()=>{
    onValue(ref(db , 'AllNotes/'), (snapshot) => {
      const myArray = []

      snapshot.forEach((item)=>{
        myArray.push({key: item.key , notes: item.val()})
      })
      setNoteItem(myArray)
    });

  } , [])

  // ---------------------Delete Note-----------------
  const handleDel = (Data)=>{
    set(push(ref(db, 'removedNotes/')), {
      title: Data.notes.title,
      content: Data.notes.content,
      color: Data.notes.color
    });
    // ------------Remove 
    remove(ref(db , 'AllNotes/' + Data.key))
  }
  return (
    <>
    {
      noteItem.length == 0?
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
              <div key={i} className="bg-[#2d2e30] p-5 rounded-lg shadow hover:shadow-lg relative">
                <div onClick={()=>handleDel(item)} className='absolute top-4 right-4 cursor-pointer hover:bg-[#e0070780] duration-200 w-[40px] h-[40px] rounded-full flex items-center justify-center'><RiDeleteBin6Line className='text-white text-[20px]'/></div>
                <h3 className="font-bold mb-4 text-white">{item.notes.title}</h3>
                <p className="text-gray-300">{item.notes.content}</p>
              </div>
            ))
          }
        </div>
    } 
    </>
  )
}

export default Notes