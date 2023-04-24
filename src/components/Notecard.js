import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';


const Notecard = (props) => {
    const context = useContext(NoteContext);

    const { deleteNote } = context;

    const { note, updateNote } = props;

    // const handleUpdate = () => {
    //     updateNote(note);
    // }

    // const handleDelete = () => {
    //     deleteNote(note._id);
    // }

    return (
        <div>
            <div className="card border-warning col mx-3" style={{width: "18rem"}}>

                <div className="card-body">
                    <h5 className="card-title card-header">{note.title}</h5>
                    <h6 className="card-subtitle my-2 text-body-secondary">Added: {note.date}</h6>
                    <p className="card-text my-2">{note.description}</p>
                    <i className="fa-solid fa-file-pen mx-2" onClick={() => {updateNote(note);}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id); props.showNotif("Note Deleted...", "successful")}}></i>
                </div>
            </div>
        </div>
    )
}

export default Notecard
