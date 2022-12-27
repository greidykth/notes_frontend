import React from 'react'

const NotesError = ({error}) => {
  return (
    <p className='text-red-700 font-bold text-xl'>
      {error}
    </p>
  )
}

export default NotesError
