import React from 'react'

const Notes = () => {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#2d2e30] p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold mb-2 dark:text-white">Note Title {i + 1}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This is a sample note content to see how it will look in the grid layout.
            </p>
          </div>
        ))}
    </div>
    </>
  )
}

export default Notes