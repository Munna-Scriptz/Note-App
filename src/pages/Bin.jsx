import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const Bin = () => {
    const db = getDatabase();
    const [delNotes , setDelNotes] = useState([])
    const currentUser = useSelector(state=>state.MyRedux.value)
    
    const [showText , setShowText] = useState('')
    // ---------------------Firebase Notes 
    useEffect(()=>{
        onValue(ref(db , 'removedNotes/'), (snapshot) => {
            setShowText(snapshot.val())
            const myArray = []

            snapshot.forEach((item)=>{
                myArray.push({key: item.key , notes: item.val()})
            })

            setDelNotes(myArray)
        });
    } , [])
  return (
    <>
    <div className="p-6">
      {/* ------------------------Header----------------------------*/}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-200">🗑️ Bin</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md bg-[#1f1f1f] text-gray-200 hover:bg-green-600 transition cursor-pointer">Recover All</button>
          <button className="px-4 py-2 rounded-md bg-[#1f1f1f] text-gray-200 hover:bg-red-600 transition cursor-pointer">Delete All</button>
        </div>
      </div>
    </div>
    {/* ------------------------Header----------------------------*/}
    <div>
          {
            showText == null?
            <div className='flex items-center justify-center h-[450px]'>
              <h1 className='font-Poppins text-white font-medium text-2xl'>You Don't have any notes Yet...</h1>
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
                        <div onClick={()=>handleDel(item)} className='absolute top-4 right-4 cursor-pointer hover:bg-[#e0070780] duration-200 w-[40px] h-[40px] rounded-full flex items-center justify-center'><RiDeleteBin6Line className='text-white text-[20px]'/></div>
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