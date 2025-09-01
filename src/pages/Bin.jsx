import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { MdLoop } from 'react-icons/md';

const Bin = () => {
    const db = getDatabase();
    const [delNotes , setDelNotes] = useState([])
    const currentUser = useSelector(state=>state.MyRedux.value)
    const [showText , setShowText] = useState('')
    // ---------------------Firebase Notes Show
    useEffect(()=>{
        onValue(ref(db , 'removedNotes/'), (snapshot) => {
            const myArray = []

            snapshot.forEach((item)=>{
              if(item.val().creatorId == currentUser.uid){
                myArray.push({key: item.key , notes: item.val()})
              }else{
                setShowText(item.val())
              }
            })

            setDelNotes(myArray)

            if(myArray.length === 0){
              setShowText(null)
            }else{
              setShowText("hasNotes")
            }
        });
    } , [currentUser.uid])

    // -------------------Notes single Delete 
    const PermDelete = (item)=>{
        remove(ref(db , 'removedNotes/' + item.key))
    }
    // -------------------Delete All
    const delAll = ()=>{
      delNotes.map((item)=>{
        remove(ref(db , 'removedNotes/' + item.key))
      })
    } 
    // -------------------Recover Single note
    const recoverNotes = (item)=>{
      set(push(ref(db, 'AllNotes/')), {
        title: item.notes.title,
        content: item.notes.content,
        color: item.notes.color,
        creatorId : currentUser.uid
      });
      remove(ref(db , 'removedNotes/' + item.key))
    }
    // -------------------Recover Single note
    const recoverAllNotes = ()=>{
      delNotes.map((item)=>{
        set(push(ref(db, 'AllNotes/')), {
          title: item.notes.title,
          content: item.notes.content,
          color: item.notes.color,
          creatorId : currentUser.uid
        });
        remove(ref(db , 'removedNotes/' + item.key))
      })
      
    }
  return (
    <>
    <div className="p-6">
      {/* ------------------------Header----------------------------*/}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-200">🗑️ Bin</h1>
        <div className="flex gap-2">
          <button onClick={recoverAllNotes} className="px-4 py-2 rounded-md bg-[#2D2E30] text-gray-200 hover:bg-green-600 transition cursor-pointer">Recover All</button>
          <button onClick={delAll} className="px-4 py-2 rounded-md bg-[#2D2E30] text-gray-200 hover:bg-red-600 transition cursor-pointer">Delete All</button>
        </div>
      </div>
    </div>
    {/* ------------------------Header----------------------------*/}
    <div>
          {
            showText == null?
            <div className='flex items-center justify-center h-[450px]'>
              <h1 className='font-Poppins text-white font-medium text-2xl'>You Don't have any Deleted notes...</h1>
            </div>
            :
              delNotes.length == 0?
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
                    delNotes.map((item , i)=>(
                      <div key={i} className={`p-5 rounded-lg shadow hover:shadow-lg relative`} style={{ backgroundColor: item.notes.color }} >
                        {/* -----------------Recover And Delete------------------- */}
                        <div className='flex items-center gap-0 absolute top-4 right-4'>
                          <div onClick={()=>recoverNotes(item)} className='cursor-pointer hover:bg-[#21c21280] duration-200 w-[40px] h-[40px] rounded-full flex items-center justify-center'>
                            <MdLoop className='text-white text-[20px]'/>
                          </div>
                          <div onClick={()=>PermDelete(item)} className='cursor-pointer hover:bg-[#e0070780] duration-200 w-[40px] h-[40px] rounded-full flex items-center justify-center'>
                            <RiDeleteBin6Line className='text-white text-[20px]'/>
                          </div>
                        </div>
                        {/* ----------------Notes Title And Content--------------------- */}
                        <h3 className="font-bold mb-4 text-white">{item.notes.title}</h3>
                        <p className="text-gray-300">{item.notes.content}</p>
                      </div>
                    ))
                  }
                </div>
          }
    </div>

    </>
  )
}

export default Bin