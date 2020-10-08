import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';


function App() {
  const [notes, setNotes] = useState([]);

  useEffect( () =>{
    async function getNotes(){
      const req = await axios
      .get('http://localhost:5000/');
      setNotes(req.data)
    }
    getNotes();
  },[]);


  function addNote(newNote) {
    axios.post('http://localhost:5000/', newNote)
      .then(res => console.log(res.data));
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });

  }

  function deleteNote(id) {
    //console.log(id)
    axios.delete('http://localhost:5000/'+id)
      .then(response => { console.log(response.data)});

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem._id !== id;
      });
    });

  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            id={noteItem._id}
            key={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
