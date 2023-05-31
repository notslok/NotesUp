import { React, useContext, useEffect, useRef, useState } from 'react';
import Notecard from './Notecard';
import AddNote from './AddNote';
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id:"", editTitle:"", editDescription:"", editTag:""});
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);


    // useRef hooks...


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag});
    }


    
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value}); //<-main logic
        // editNotes();
    }

    const handleSubmit = (e) => {
        console.log("Updating the note...", note);
        
        editNote(note.id, note.editTitle, note.editDescription, note.editTag)
        
        refClose.current.click();
        
        // props.showNotif("Updated", "success");
        // e.preventDefault();    
    }
    //


    return (
        <>
            <AddNote showNotif={props.showNotif}/>
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
                                    <input type="text" className="form-control" id="editTitle" name="editTitle" value={note.editTitle} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editDescription" name="editDescription" value={note.editDescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="editTag" name="editTag" value={note.editTag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.editTitle.length<5 || note.editDescription.length<5} type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes</h1>
            <div className='row row-cols-3 my-3'>
                <div className='container'>
                    {notes.length === 0 && `No notes to display!`}
                </div>
                {notes.map((note) => {
                    return <Notecard key={note._id} updateNote={updateNote} note={note} showNotif={props.showNotif}/>;
                })}
            </div>
        </>
    )
}

export default Notes;
