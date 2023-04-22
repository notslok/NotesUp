import { React, useContext } from 'react';
import Notecard from './Notecard';
import AddNote from './AddNote';
import NoteContext from "../context/notes/noteContext";

const Notes = () => {

    const context = useContext(NoteContext);
    const { notes } = context;

    return (
        <>
            <AddNote/>

            <h1>Your Notes</h1>
            <div className='row row-cols-3 my-3'>

                {notes.map((note) => {
                    return <Notecard key={note._id} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
