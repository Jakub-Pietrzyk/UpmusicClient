import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from "react-router-dom";
import { show, update } from "../../services/songs.service";

function SongsEdit() {
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if(!song) getData();
  });

  const getData = () => {
    show(id).then(function(data){
      setSong(data)
      setLoading(false)
    }).catch(function(error){
      console.log("[ERROR] - SongsEdit - " + error.message);
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    update(id,song).then(function(data){
      setRedirect(true)
    }).catch(function(error){
      console.log("[ERROR] - SongsEdit - " + error.message);
    })
  }

  const handleChange = (event) => {
    let songData = { ...song };
    songData[event.target.name] = event.target.value;
    setSong(songData);
  }

  if(redirect){
    return (
      <Navigate replace to={"/songs/" + String(id)} />
    )
  } else {

    if(loading){
      return(
        <p>Loading...</p>
      )
    } else {
      return(
        <div>
          <h1>Edit song</h1>

          <form onSubmit={handleSubmit}>
            <label>
              Nazwa:
              <input name="name" type="text" value={song.name} onChange={handleChange} />
            </label>
            <input type="submit" value="Wyślij" />
          </form>
        </div>
      )
    }

  }

}

export default SongsEdit;
