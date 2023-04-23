import {React, useContext, useState, useRef} from 'react'
import NoteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(NoteContext);    
    const { addNote } = context;


    // for handling form input events
    const [note, setNote] = useState({title:"", description:"", tag:""});
    
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value}); //<-main logic
    }
    //

    // for handling form submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        
        addNote(note.title, note.description, note.tag);
        
        setNote({title:"", description:"", tag:""}); //empty form after submit
        // clear the fields after submission
        
    }
    
    
    
    return (
        <div>
            <div className='container my-2'>
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label  htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onChange} minLength={5} required value={note.title}/>
                    </div>
                    <div className="mb-3">
                        <label  htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description}/>
                    </div>
                    <div className="mb-3">
                        <label  htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
