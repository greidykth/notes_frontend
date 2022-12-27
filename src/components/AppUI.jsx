import React, { useContext, useState } from "react";
import { NoteContext } from "../NoteContext";
import IndexNotes from "./IndexNotes";
import NoteForm from "./NoteForm";
import Button from "./UI/Button";
import ConfirmationModal from "./UI/ConfirmationModal/ConfirmationModal";
import Container from "./UI/Container";
import Header from "./UI/Header";
import { Modal } from "./UI/Modal/Modal";
import SearchNote from "./UI/SearchNote";

function AppUI() {
  const {
    openModalNotes,
    setOpenModalNotes,
    openConfirmationModal,
  } = useContext(NoteContext);

  return (
    <>
      <Header title="Notes" />
      <Container>
        <SearchNote />
        <Button
          color="green"
          type="button"
          text="CREATE NEW"
          onClickButton={() => setOpenModalNotes(true)}
        />
        <IndexNotes onClickEditButton={() => setOpenModalNotes(true)} />
      </Container>
      {openModalNotes && (
        <Modal title="Note">
          <NoteForm />
        </Modal>
      )}
      {openConfirmationModal && 
        <ConfirmationModal />
    }
    </>
  );
}

export default AppUI;
