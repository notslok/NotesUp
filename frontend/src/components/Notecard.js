import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';
import {message, Popconfirm, Divider, Space, Tag } from 'antd';


const Notecard = (props) => {
    const context = useContext(NoteContext);
    
    const { deleteNote } = context;
    
    const { note, updateNote } = props;
    
    const confirm = (e) => {
        console.log(e);
        deleteNote(note._id);
        message.success('Note Deleted');
    };

    return (
        <div>
            <div className="card border-warning col mx-3" style={{width: "18rem"}}>

                <div className="card-body">
                    <h5 className="card-title card-header">{note.title}</h5>
                    <h6 className="card-subtitle my-2 text-body-secondary">Added: {note.date}</h6>
                    <p className="card-text my-2">{note.description}</p>
                    <i className="fa-solid fa-file-pen mx-2" onClick={() => {updateNote(note);}}></i>
                    
                    <Popconfirm
                        title="Delete the note"
                        description="Are you sure to delete this note?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                    <i className="fa-solid fa-trash mx-2"></i>
                    </Popconfirm>
                </div>
            </div>
        </div>
    )
}

export default Notecard
