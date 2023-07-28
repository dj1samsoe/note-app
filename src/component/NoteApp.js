import React, { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import ConfirmationModal from "./ConfirmationModal";

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({
    title: "",
    content: "",
    timestamp: "",
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAddNote = () => {
    if (currentNote.title.trim() !== "" && currentNote.content.trim() !== "") {
      if (editIndex >= 0) {
        // If editing an existing note
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = currentNote;
        setNotes(updatedNotes);
        setEditIndex(-1);
      } else {
        // If adding a new note
        setNotes([
          ...notes,
          { ...currentNote, timestamp: getCurrentTimestamp() },
        ]);
      }
      setCurrentNote({
        title: "",
        content: "",
        timestamp: "",
      });
    }
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setEditIndex(index);
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleDeleteNote = (index) => {
    setShowDeleteConfirmation(true);
    setNoteToDelete(index);
  };

  const confirmDeleteNote = () => {
    const updatedNotes = [...notes];
    updatedNotes.splice(noteToDelete, 1);
    setNotes(updatedNotes);
    setEditIndex(-1);
    setShowDeleteConfirmation(false);
  };

  const cancelDeleteNote = () => {
    setShowDeleteConfirmation(false);
    setNoteToDelete(null);
  };

  const handleInputChange = (e) => {
    setCurrentNote({
      ...currentNote,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`container mx-auto min-h-screen min-w-full px-4 py-8 font-sans ${
        isDarkMode ? "dark bg-gray-800 text-white" : "bg-gray-100"
      }`}
    >
      <h1 className="text-4xl font-bold mb-4 text-center">Note App</h1>
      <div className="mb-10 flex gap-3 justify-center items-center">
        <SunIcon className="w-5 h-5 text-yellow-300" />
        <label className="switch px-6 py-3">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="switch-input"
          />
          <span
            className={`switch-label ${
              isDarkMode ? "bg-blue-600" : "bg-gray-400"
            }`}
            //   data-on="Dark"
            //   data-off="Light"
          ></span>
          <span
            className={`switch-handle ${
              isDarkMode ? "translate-x-6" : "translate-x-1"
            }`}
          ></span>
        </label>
        <MoonIcon className="w-5 h-5 text-yellow-300" />
      </div>
      <div className="flex flex-col mb-4">
        <input
          type="text"
          name="title"
          value={currentNote.title}
          onChange={handleInputChange}
          className={`border rounded px-3 py-2 mb-2 ${
            isDarkMode ? "dark bg-gray-800 text-white" : "bg-gray-100"
          }`}
          placeholder="Masukkan Judul Note"
        />
        <textarea
          name="content"
          value={currentNote.content}
          onChange={handleInputChange}
          className={`border rounded px-3 py-2 mb-2 ${
            isDarkMode ? "dark bg-gray-800 text-white" : "bg-gray-100"
          }`}
          placeholder="Masukkan Isi Note"
        />
        <button
          onClick={handleAddNote}
          className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${
            isDarkMode ? "dark:bg-blue-700" : ""
          }`}
        >
          {editIndex >= 0 ? "Save Note" : "Add Note"}
        </button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li
            key={index}
            className={`mb-4 bg-slate-200 shadow-xl rounded-md ${
              isDarkMode ? "dark bg-gray-700 text-white" : ""
            }`}
          >
            <h2 className="text-xl font-bold px-4 pt-2 pb-4">{note.title}</h2>
            <p className="px-4 break-words">{note.content}</p>
            <p className="text-sm font-light px-4 py-4 ">
              Dibuat pada : {note.timestamp} | {note.content.length} characters
            </p>
            <div className="flex mt-2 px-4 pb-4">
              <button
                onClick={() => handleEditNote(index)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showDeleteConfirmation && (
        <ConfirmationModal
          message="Anda yakin ingin menghapus catatan ini?"
          onCancel={cancelDeleteNote}
          onConfirm={confirmDeleteNote}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default NoteApp;
