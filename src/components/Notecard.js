import React from 'react'

const Notecard = (props) => {
    const { note } = props;

    return (
        <div>
            <div className="card border-warning col mx-3" style={{width: "18rem"}}>

                <div className="card-body">
                    <h5 className="card-title card-header">{note.title}</h5>
                    <h6 className="card-subtitle my-2 text-body-secondary">Added: {note.date}</h6>
                    <p className="card-text my-2">{note.description}</p>
                    <a href="/" className="card-link my-2">Card link</a>
                </div>
            </div>
        </div>
    )
}

export default Notecard
