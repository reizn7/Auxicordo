import NoteContext from './noteContext';
import React, { useState } from 'react';


const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await fetch("http://localhost:5000/api/notesall/fetchnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });

    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, content) => {
    const response = await fetch("http://localhost:5000/api/notesall/addnotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const text = await response.text();  
      console.error("Add Note Error:", text); 
      return;
    }
    const newNote = await response.json();
    setNotes(notes.concat(newNote)); 
  };

  const deleteNote = async (id) => {
    const response = await fetch(`http://localhost:5000/api/notesall/updatenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });

    const json = await response.json();
    console.log(json);

    setNotes(notes.filter(note => note._id !== id));
  };

  const updateNote = async (id, title, content) => {
    const response = await fetch(`http://localhost:5000/api/notesall/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, content }),
    });

    const json = await response.json();
    console.log(json);


    setNotes(notes.map(note => 
      note._id === id ? { ...note, title, content } : note
    ));
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
