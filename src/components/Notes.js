import { React, useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import Notecard from './Notecard';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, setNotes } = context;

    return (
        <>
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
