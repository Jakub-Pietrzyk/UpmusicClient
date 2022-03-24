import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import { show, destroy } from "../../services/songs.service";

function SongsShow() {
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(!song) getData();
  });

  const getData = () => {
    show(id).then(function(data){
      setSong(data)
      setLoading(false)
    }).catch(function(error){
      console.log("[ERROR] - SongsShow - " + error.message);
    })
  };

  const deleteLinkEvent = (e) => {
    e.preventDefault();
    destroy(id).then(function(data){
      navigate("..");
    }).catch(function(error){
      console.log("[ERROR] - SongsShow - " + error.message);
    })
  }

  if(loading){
    return(
      <p>Loading...</p>
    )
  } else {
    return(
      <div>
        <h1>Songs show</h1>
        <h4><strong>Name: </strong>{song.name}</h4>
        <div>
          <Link to={"./edit"}>Edit</Link>
          {" | "}
          <Link to="#" onClick={deleteLinkEvent}>Delete</Link>
        </div>
      </div>
    )
  }

}

export default SongsShow;
