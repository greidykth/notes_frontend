import React from "react";

const buttonStyles = {
  blue: "bg-blue-500 hover:bg-blue-700",
  green:"bg-green-500 hover:bg-green-700",
  gray: "bg-gray-500 hover:bg-gray-700",
  red: "bg-red-500 hover:bg-red-700",
};

const Button = ({ color, text, type, onClickButton }) => {
  return (
    <>
      <button className={`${buttonStyles[color]} py-1 px-2 mr-1 text-md font-medium text-center text-white rounded`} 
        onClick={onClickButton}
        type={type}
        >
        {text}
      </button>   
    </>
  );
};

export default Button;
