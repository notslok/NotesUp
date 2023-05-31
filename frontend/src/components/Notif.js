import React from 'react'

function Notif(props) {
    const capitalize = (word)=>{
        if(word === "danger"){
            word = "error";
        }else if(word === "warning"){
            word = "See Ya! ";
        }

        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message} 
        </div>}
        </div>
    )
}

export default Notif;