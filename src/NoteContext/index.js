import React, { createContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";

const contentTypeHeaders = "application/json;charset=UTF-8";
const notesBaseUrl = 'http://notes.test/notes';
const tagsBaseUrl = 'http://notes.test/tags';

const NoteContext = React.createContext();

function NoteProvider(props) {
  const {
    isSaving,
    isLoading,
    error,
    sendRequest: sendRequestNotes,
  } = useHttp();

  const [openModalNotes, setOpenModalNotes] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteEdit, setNoteEdit] = useState({});
  const [noteDelete, setNoteDelete] = useState({});
  const [tagsIndex, setTagsIndex] = useState([]);
  

  const getNotes = (searchText = '') => {
    sendRequestNotes(
        {
          url: notesBaseUrl + '/search',
          method: 'POST',
          headers: {
            "Content-type": contentTypeHeaders,
          },
          body:{searchText}
        },
        loadNotes
      );
  }

  const loadNotes = (resultado) => {
    console.log(resultado.data);
    setNotes(resultado.data);
  };

  const deleteNote = (note_id ) => {
    sendRequestNotes(
        {
          url: notesBaseUrl + "/" + note_id,
          method: 'DELETE',
          headers: {
            "Content-type": contentTypeHeaders,
          },
        },
        getNotes,
        false
      );
      setOpenConfirmationModal(false);
  }

  const storeNote = (body ) => {
    sendRequestNotes(
        {
          url: notesBaseUrl,
          method: 'POST',
          headers: {
            "Content-type": contentTypeHeaders,
          },
          body
        },
        getNotes,
        false
      );
  }

  const editNote = (note_id, body) => {
    sendRequestNotes(
        {
          url: notesBaseUrl + "/" + note_id,
          method: 'PUT',
          headers: {
            "Content-type": contentTypeHeaders,
          },
          body
        },
        getNotes,
        false
      );
  }

  const getNote = (note_id) => {
    sendRequestNotes(
        {
            url: notesBaseUrl + "/" + note_id,
            method: "GET",
            headers: {
              "Content-type": contentTypeHeaders,
            },
        },
        loadNote
    )
  }

  const loadNote = (resultado) => {
    setNoteEdit(resultado.data);
    console.log(noteEdit);
  }

  const getTags = () => {
    sendRequestNotes(
        {
            url: tagsBaseUrl,
            method: "GET",
            headers: {
              "Content-type": contentTypeHeaders,
            },
        },
        loadTags
    )
  }

  const onConfirmDelete = (note) => {
    setOpenConfirmationModal(true);
    setNoteDelete(note);
  }

  const loadTags = (resultado) => {
    setTagsIndex(resultado.data);
    console.log(tagsIndex);
  };

  const storeTag = (body ) => {
    sendRequestNotes(
        {
          url: tagsBaseUrl,
          method: 'POST',
          headers: {
            "Content-type": contentTypeHeaders,
          },
          body
        },
        getTags
      );
  }

  return (
    <NoteContext.Provider
      value={{
        openModalNotes,
        setOpenModalNotes,
        openConfirmationModal,
        setOpenConfirmationModal,
        isSaving,
        isLoading,
        error,
        getNotes,
        deleteNote,
        storeNote,
        editNote,
        getTags,
        storeTag,
        notes,
        tagsIndex,
        getNote,
        noteEdit,
        noteDelete,
        setNoteEdit,
        onConfirmDelete,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export {NoteContext, NoteProvider}
