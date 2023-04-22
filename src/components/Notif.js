import React from 'react'

const Notif = (props) => {
    return (
        <div className={`alert alert-${props.notifType}`} role="alert">
            {props.message}
        </div>
    )
}

export default Notif
