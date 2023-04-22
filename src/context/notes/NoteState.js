import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{

    const notesInitial = [
        {
          "key": "6440555c39a0fdef6d5261d5",
          "_id": "6440555c39a0fdef6d5261d5",
          "user": "64402cafccd2bdf557a9593b",
          "title": "my title",
          "description": "sakjdbfkasbdfaskdb",
          "tag": "asdkjfbaskjdf",
          "date": "2023-04-19T20:55:56.549Z",
          "__v": 0
        },
        {
          "_id": "644055b239a0fdef6d5261d7",
          "key": "644055b239a0fdef6d5261d7",
          "user": "64402cafccd2bdf557a9593b",
          "title": "my title",
          "description": "sakjdbfkasbdfaskdb",
          "tag": "asdkjfbaskjdf",
          "date": "2023-04-19T20:57:22.864Z",
          "__v": 0
        },
        {
          "_id": "6440c2b4e7a8ac02877e3248",
          "key": "6440c2b4e7a8ac02877e3248",
          "user": "64402cafccd2bdf557a9593b",
          "title": "Updates titlezzzzzzzzzzzzzz",
          "description": "zzzzzzzzzzzz",
          "tag": "asdksddddddddddddddddd",
          "date": "2023-04-20T04:42:28.559Z",
          "__v": 0
        },
        {
          "_id": "6440wec2b4e7a8ac02877e3248",
          "key": "6440c2sdb4e7a8ac02877e3248",
          "user": "64402cafccd2bdf557a9593b",
          "title": "Updates titlezzzzzzzzzzzzzz",
          "description": "zzzzzzzzzzzz",
          "tag": "asdksddddddddddddddddd",
          "date": "2023-04-20T04:42:28.559Z",
          "__v": 0
        },
        {
          "_id": "6440c2wewerb4e7a8ac02877e3248",
          "key": "6440c2b4ase7a8ac02877e3248",
          "user": "64402cafccd2bdf557a9593b",
          "title": "Updates titlezzzzzzzzzzzzzz",
          "description": "zzzzzzzzzzzz",
          "tag": "asdksddddddddddddddddd",
          "date": "2023-04-20T04:42:28.559Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);

    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;