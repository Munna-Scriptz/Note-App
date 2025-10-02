import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { MdLoop } from 'react-icons/md';
import deleteIcon from '../assets/images/deleteIcon.svg'
import recoverIcon from '../assets/images/recoverIcon.svg'
import dustBin from '../assets/images/dustbinIcon.svg'
import noNotes from '../assets/images/noNotes.svg'

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
              if(item.val().creatorId == currentUser?.uid){
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
    } , [currentUser?.uid])

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
        creatorId : currentUser?.uid
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
          creatorId : currentUser?.uid
        });
        remove(ref(db , 'removedNotes/' + item.key))
      })
      
    }
  return (
    <>
    <div className="p-6">
      {/* ------------------------Header----------------------------*/}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-200 flex items-center gap-3 mb-4 sm:mb-0"><img className='w-[30px] sm:w-[40px]' src={dustBin} alt="Dustbin" /> Trash</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={recoverAllNotes} className="px-4 py-2 rounded-md bg-[#2D2E30] text-gray-200 hover:bg-green-600 transition cursor-pointer">Recover All</button>
          <button onClick={delAll} className="px-4 py-2 rounded-md bg-[#2D2E30] text-gray-200 hover:bg-red-600 transition cursor-pointer">Delete All</button>
        </div>
      </div>
    </div>
    {/* ------------------------Header----------------------------*/}
    <div>
          {
            showText == null?
            <div className='flex flex-col items-center justify-center lg:h-[450px] h-[350px]'>
              <img src={noNotes} alt="Not founded" />
              <h1 className='font-Poppins text-white font-medium md:text-2xl text-lg text-center'>You Don't have any Deleted notes...</h1>
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
                          <div onClick={()=>recoverNotes(item)} className='cursor-pointer hover:bg-[#21c21280] duration-200 w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full flex items-center justify-center'>
                            <img className='w-[16px] sm:w-[20px]' src={recoverIcon} alt="delete" />
                          </div>
                          <div onClick={()=>PermDelete(item)} className='cursor-pointer hover:bg-[#e0070780] duration-200 w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full flex items-center justify-center'>
                            <img className='w-[20px] sm:w-[24px]' src={deleteIcon} alt="delete" />
                          </div>
                        </div>
                        {/* ----------------Notes Title And Content--------------------- */}
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

export default Bin