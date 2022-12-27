import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { NoteContext } from "../../../NoteContext";
import Button from "../Button";
import IconButton from "../IconButton";
import "../Modal/modal.css";
import Icon from "../Icon";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

const ConfirmationModal = () => {
  const { setOpenConfirmationModal, deleteNote, noteDelete } = useContext(NoteContext);

  return ReactDOM.createPortal(
    <div
      id="popup-modal"
      tabIndex="-1"
      className="ModalBackground fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-400">
          <div className="flex justify-end p-2 rounded-t">
            <IconButton
              type="close"
              color="gray"
              onClick={() => setOpenConfirmationModal(false)}
            />
          </div>
          <div className="p-6 text-center space-x-2">
            <Icon icon={faWarning} css="w-12 h-12" />
            <h3 className="mb-5 text-lg font-normal text-gray-600">
              Are you sure you want to delete this note?
            </h3>

            <Button
              color="red"
              type="button"
              text="Yes, I'm sure"
              onClickButton={() => deleteNote(noteDelete.id)}
            />
            <Button
              color="gray"
              type="button"
              text="No, cancel"
              onClickButton={() => setOpenConfirmationModal(false)}
            />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("confirmationModal")
  );
};

export default ConfirmationModal;
