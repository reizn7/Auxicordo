import React, { useState, useEffect, useContext } from "react";
import NoteContext from "../../context/notes/noteContext";
import "./EditNote.css"; 

const EditNote = ({ note, show, onClose }) => {
  const { updateNote } = useContext(NoteContext);

  const [editedNote, setEditedNote] = useState({
    id: note._id,
    title: note.title,
    content: note.content,
  });

  // Sync local state when note changes
  useEffect(() => {
    setEditedNote({
      id: note._id,
      title: note.title,
      content: note.content,
    });
  }, [note]);

  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateNote(editedNote.id, editedNote.title, editedNote.content);
    onClose(); 
  };

  if (!show) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>Edit Note</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            required
            placeholder="Title"
          />
          <textarea
            name="content"
            rows="4"
            value={editedNote.content}
            onChange={handleChange}
            required
            placeholder="Content"
          ></textarea>

          <div className="modal-buttons">
            <button type="button" className="btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
