import React from 'react'

const Header = ({title}) => {
  return (
    <header className="w-full h-16 text-4xl font-bold text-blue-600 flex justify-center items-center p-16">
    {title}
    </header>
  )
}

export default Header
