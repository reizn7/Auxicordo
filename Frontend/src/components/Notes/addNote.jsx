import React, { useContext, useState } from 'react';
import './AddNote.css';
import noteContext from '../../context/notes/noteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.content);
    setNote({ title: "", content: "" });
  };

  return (
    <div className="add-note-container">
      <h2>Add a Note</h2>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="content">Description</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
            rows="3"
            placeholder="Enter note description"
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
