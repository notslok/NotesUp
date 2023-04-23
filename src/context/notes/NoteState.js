import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const host = "http://localhost:5000";
    const notesInitial = [];

      const [notes, setNotes] = useState(notesInitial);
      
      // Get ALL NOTES ----------------------------
      const getNotes = async () => {
        const url =  `${host}/api/notes/fetchallnotes`;   
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDJjYWZjY2QyYmRmNTU3YTk1OTNiIn0sImlhdCI6MTY4MTkyNzM0M30.LLTiOhBZ8ScBsGuYXkJI_F8XB0QWWg-HJXCQFmA8ldI"
            }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setNotes(jsonResponse);
    }
      
      
      // ADD a note ------------------------------
      const addNote = async (title, description, tag) => {
        // API CALL(todo)
        const url =  `${host}/api/notes/addNote`;   
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDJjYWZjY2QyYmRmNTU3YTk1OTNiIn0sImlhdCI6MTY4MTkyNzM0M30.LLTiOhBZ8ScBsGuYXkJI_F8XB0QWWg-HJXCQFmA8ldI"
            },
            body: JSON.stringify({title, description, tag})
        });
        // const jsonResponse =  response.json();

        console.log("addNote called...")
        let note = { //acts as a variable for new note
            "_id": "6440c2wewesdrb4e7a8ac02877e3248",
            "key": "6440c2b4ase7a8ac02877e3248",
            "user": "64402cafccd2bdf557a9593b",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-04-20T04:42:28.559Z",
            "__v": 0
          };
        // setNotes(notes.push(note)); // updating note state-> not the right way as .push just updates the array
        setNotes(notes.concat(note)); // where as .concat updates and then returns a new array
      }
      

      // EDIT a note ------------------------------
      const editNote = async (id, title, description, tag) => {
        // FETCH API call
        const url =  `${host}/api/notes/updatenote/${id}`;   
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDJjYWZjY2QyYmRmNTU3YTk1OTNiIn0sImlhdCI6MTY4MTkyNzM0M30.LLTiOhBZ8ScBsGuYXkJI_F8XB0QWWg-HJXCQFmA8ldI"
            },
            body: JSON.stringify({title, description, tag})
        });
        // const jsonResponse =  response.json();

        // logic to edit notes 
        for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                if(element._id === id){
                    element.title = title;
                    element.description = description;
                    element.tag = tag;
                }
            }
      }

      // DELETE a note ----------------------------
      const deleteNote = async (id) => {
        // API CALL(todo)
        // console.log(`Deleting ${id}`);
        const url =  `${host}/api/notes/deletenote/${id}`;   
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDJjYWZjY2QyYmRmNTU3YTk1OTNiIn0sImlhdCI6MTY4MTkyNzM0M30.LLTiOhBZ8ScBsGuYXkJI_F8XB0QWWg-HJXCQFmA8ldI"
            }
        });
        
        const newNotes = notes.filter((note) => { return note._id !== id});
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setNotes(newNotes);
      }

    return(
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;