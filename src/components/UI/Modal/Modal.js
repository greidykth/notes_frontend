import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { NoteContext } from "../../../NoteContext";
import Button from "../Button";
import IconButton from "../IconButton";
import "./modal.css";

const Modal = ({ children, title }) => {

  const {setOpenModalNotes, setNoteEdit} = useContext(NoteContext);

  const onCloseModal = () => {
    setOpenModalNotes(false);
    setNoteEdit({});
  }

  return ReactDOM.createPortal(
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="ModalBackground fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-300">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900">
              {title}
            </h3>

            <IconButton type="close" color="gray" onClick={onCloseModal}/>
          </div>
          {children}
          
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export { Modal };
