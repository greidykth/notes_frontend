import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { NoteContext } from "../NoteContext";
import Button from "./UI/Button";
import EmptyNotes from "./UI/EmptyNotes";
import IconButton from "./UI/IconButton";
import NotesError from "./UI/NotesError";
import Spinner from "./UI/Spinner/Spinner";

const IndexNotes = ({onClickEditButton}) => {

  const {notes, 
    getNotes,
    error,
    isLoading,
    getNote,
    onConfirmDelete
  } = useContext(NoteContext);

  useEffect(() => {
    getNotes()
  }, []);

  const onEditNote = (note_id) => {
    onClickEditButton();
    getNote(note_id);
  }

  return (
    <>
      {error && <NotesError error={error} />}
      {isLoading && <Spinner />}
      {!notes.length && !isLoading && !error && (
        <EmptyNotes>
          No se encontraron notas. Crea una nota
        </EmptyNotes>
      )}

      {notes.length > 0 && (
        <div className="overflow-x-auto relative m-5 rounded-lg shadow-xl">
          <table className="w-full text-sm text-left text-blue-500 dark:text-blue-400">
            <thead className="text-xs text-blue-700 uppercase bg-blue-50 dark:bg-blue-700 dark:text-blue-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Description
                </th>
                <th scope="col" className="py-3 px-6">
                  Tags
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {notes.length > 0 &&
                notes.map((note) => (
                  <tr key={note.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white">
                    <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{note.id}</th>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {note.title}
                    </th>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{note.description}</td>
                    <td className="py-4 px-6">
                    {note?.tags && note.tags.map((tag) => 
                      <p key={tag.id} className="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 mb-1 px-2.5 py-0.5 rounded">{tag.name}</p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div
                        className="inline-flex rounded-md shadow-sm"
                        role="group"
                      >
                        <IconButton type="edit" color="blue" onClick={() => onEditNote(note.id)} />
                        <IconButton type="delete" color="red" onClick={() => onConfirmDelete(note)} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default IndexNotes;
