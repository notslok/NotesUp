import { useState } from "react";
import NotificationContext from "./notifContext";

const NotificationState = (props) => { 
    let messageInitial = "";
    let modeInitial = "primary";

    <NotificationContext.Provider value="">
            {props.children}
    </NotificationContext.Provider>

}

export default NotificationState;

