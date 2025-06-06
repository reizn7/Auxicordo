import React, { useState } from "react";
import EditNote from "./editNote";
import "./noteitem.css";

const NoteItem = ({ note, deleteNote }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="note-item">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle">By: {note.user}</h6>
          <p className="card-text">{note.content}</p>

          <div className="d-flex">
            <button className="btn btn-danger" onClick={() => deleteNote(note._id)}>
              Delete
            </button>

            <button className="btn btn-primary" onClick={() => setShowEdit(true)}>
              Edit
            </button>
          </div>
        </div>
      </div>

      <EditNote note={note} show={showEdit} onClose={() => setShowEdit(false)} />
    </div>
  );
};

export default NoteItem;
