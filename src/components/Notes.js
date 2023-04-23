import { React, useContext, useEffect, useRef, useState } from 'react';
import Notecard from './Notecard';
import AddNote from './AddNote';
import NoteContext from "../context/notes/noteContext";

const Notes = () => {

    const context = useContext(NoteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);
   
    const ref = useRef(null);
    const [note, setNote] = useState({editTitle:"", editDescription:"", editTag:""});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag});
    }


    
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value}); //<-main logic
        // editNotes();
    }

    const handleSubmit = (e) => {
        console.log("Updating the note...", note);
        e.preventDefault();    
    }
    //


    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="editTitle" name="editTitle" value={note.editTitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editDescription" name="editDescription" value={note.editDescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="editTag" name="tag" value={note.editTag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes</h1>
            <div className='row row-cols-3 my-3'>

                {notes.map((note) => {
                    return <Notecard key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes;