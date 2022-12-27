import React from 'react'

const Container = ({children}) => {
  return (
    <div className="flex justify-center items-center flex-col">
      {children}
    </div>
  )
}

export default Container
