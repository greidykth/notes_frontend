import { faCancel, faDeleteLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../NoteContext";
import Button from "./UI/Button";
import Icon from "./UI/Icon";
import IconButton from "./UI/IconButton";

let enteredTag = "";
let tagsIndexLocal = [];

const NoteForm = ({ saveOpen }) => {
  const [showInputNewTag, setShowInputNewTag] = useState(false);
  const [showButtonCreateNewTag, setShowButtonCreateNewTag] = useState(true);
  const [messageNotes, setMessageNotes] = useState("");
  const [messageTag, setMessageTag] = useState("");
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState({ id: 0, name: "" });
  const newTagRef = useRef();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    tags: [],
  });

  const {
    setOpenModalNotes,
    tagsIndex,
    getTags,
    storeTag,
    storeNote,
    noteEdit,
    editNote,
    setNoteEdit,
  } = useContext(NoteContext);

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if(tagsIndexLocal.length === 0) {
      tagsIndexLocal = tagsIndex;
    }
    if (enteredTag != "") {
      const tagAdded = tagsIndex.filter((tag) => tag.name === enteredTag);
      setFormData((prevForm) => ({
        ...prevForm,
        tag_id: tagAdded[0].id,
      }));
      setSelectedTag({ id: tagAdded[0].id, name: tagAdded[0].name });
    }
  }, [tagsIndex]);

  useEffect(() => {
    if (noteEdit.id) {
      tagsIndexLocal = tagsIndex;
      noteEdit.tags.map((tagSelected) => {
        tagsIndexLocal.map((tagIndex, index) => {
          if(tagIndex.name == tagSelected.name){
            tagsIndexLocal.splice(index, 1)
          }
        })
      });

      setFormData({
        id: noteEdit.id,
        title: noteEdit.title,
        description: noteEdit.description,
      });
      setSelectedTags(noteEdit.tags);
      setSelectedTag({ id: 0, name: "" });
      console.log("cargó");
    }
  }, [noteEdit]);

  const onClickCreateNewTag = () => {
    setShowInputNewTag(true);
  };

  const changeHandler = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const changeSelectHandler = (e) => {
    setSelectedTag({
      id: e.target.value,
      name: e.target.selectedOptions[0].text,
    });
  };

  const addButtonHandler = () => {
    setSelectedTags((prevForm) => [...prevForm, selectedTag]);
    tagsIndexLocal = tagsIndexLocal.filter(
      (tag) => tag.name != selectedTag.name
    );
    setSelectedTag({ id: 0, name: "" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMessageNotes(null);
    if ([formData.description, formData.title].includes("") || selectedTags.length == 0) {
      setMessageNotes("Todos los campos son requeridos");
      return;
    }

    formData.tags = selectedTags.map((tag) => tag.id);
    
    if (formData.id != "") {
      editNote(formData.id, formData);
      setNoteEdit({});
    } else {
      storeNote(formData);
    }
    setMessageNotes("");
    setNoteEdit({});
    setFormData({
      id: "",
      title: "",
      description: "",
      tags: [],
    });
    setOpenModalNotes(false);
  };

  const onCloseModal = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      tags: [],
    });
    setOpenModalNotes(false);
    setNoteEdit({});
  };

  const changeNewTag = () => {
    enteredTag = newTagRef.current.value;
    setNewTag(enteredTag);
  };

  const onSaveNewTag = () => {
    if (newTag.trim().length === 0) {
      setMessageTag("Ingrese una etiqueta válida");
      return;
    }
    storeTag({ name: newTag });
    setMessageTag("");
    setNewTag("");
    setShowInputNewTag(false);
  };

  const onDeleteTagHandler = (tagId) => {
    let tagAddList = tagsIndex.find((tag) => tag.id == tagId);
    console.log(tagAddList, tagsIndexLocal);
    tagsIndexLocal.push(tagAddList);
    tagsIndexLocal = tagsIndexLocal.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    console.log(tagsIndexLocal);
    const updatedTags = selectedTags.filter((tag) => tag.id != tagId);
    setSelectedTags(updatedTags);
  };

  return (
    <form className="p-6 space-y-6">
      {messageNotes && <p className="text-red-700 font-bold">{messageNotes}</p>}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          data-testid="title"
          placeholder="Title"
          onChange={changeHandler}
          className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Description
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={formData.description}
          data-testid="description"
          placeholder="Description"
          onChange={changeHandler}
          className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="tag_id"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Tag
        </label>
        <div className="flex">
          <select
            type="text"
            id="tag_id"
            name="tag_id"
            value={selectedTag.id}
            data-testid="tag_id"
            placeholder="Tags"
            onChange={changeSelectHandler}
            className="p-2 mr-2 w-96 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option key="0" value="0" disabled>
              Select a tag
            </option>
            {tagsIndexLocal &&
              tagsIndexLocal.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag?.name}
                </option>
              ))}
          </select>
          <IconButton
            type="add"
            color="green"
            disabledButton={selectedTag.id === 0}
            onClick={addButtonHandler}
          />

          {showButtonCreateNewTag && (
            <Button
              color="green"
              text="Create New"
              type="button"
              onClickButton={onClickCreateNewTag}
            />
          )}
        </div>
        {selectedTags.length > 0 && (
          <div className="my-4 block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {selectedTags &&
              selectedTags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-300 text-gray-800 text-xs font-medium inline-flex items-center mb-2 px-1.5 rounded mr-1"
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => onDeleteTagHandler(tag.id)}
                    className="rounded-lg text-sm inline-flex items-center"
                  >
                    <Icon icon={faXmark} css="text-red-600 ml-1" />
                  </button>
                </span>
              ))}
          </div>
        )}
      </div>
      {messageTag && <p className="text-red-700 font-bold">{messageTag}</p>}
      {showInputNewTag && (
        <div className="flex">
          <input
            type="text"
            ref={newTagRef}
            placeholder="Name for new tag"
            id="newTag"
            onChange={changeNewTag}
            className="p-2 mr-4 w-96 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <Button
            color="green"
            text="Save New Tag"
            type="button"
            onClickButton={onSaveNewTag}
          />
        </div>
      )}
      <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <Button
          color="blue"
          text="Save"
          type="submit"
          onClickButton={submitHandler}
        />
        <Button
          color="gray"
          text="Decline"
          type="button"
          onClickButton={onCloseModal}
        />
      </div>
    </form>
  );
};

export default NoteForm;
