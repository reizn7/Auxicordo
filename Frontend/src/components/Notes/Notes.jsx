import React, { useContext } from "react";
import NoteContext from "../../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./addNote";

const Notes = () => {
  const { notes, deleteNote } = useContext(NoteContext);

  return (
    <div className="notes-container">
      <div className="add-note-section">
        <AddNote />
      </div>

      <div className="notes-list-section">
        {notes.length === 0 ? (
          <p style={{ fontSize: "1.2rem", color: "#555" }}>No notes to display.</p>
        ) : (
          notes.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              index={index}
              deleteNote={deleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
