import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { index, destroy } from "../../services/songs.service";

function SongsIndex() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(songs.length == 0) getData();
  });

  const getData = () => {
    index().then(function(data){
      setLoading(false);
      setSongs(data);
    }).catch(function(error){
      console.log("[ERROR] - SongsIndex - " + error.message);
    })
  }

  const findSongsIndex = (songId) => {
    return songs.findIndex(el => el._id == songId);
  }

  const deleteLinkEvent = (e) => {
    e.preventDefault();
    let songId = e.target.getAttribute("songid");

    destroy(songId).then(function(data){
      let songIndex = findSongsIndex(songId);
      setSongs(songs.filter((song, index) => index !== songIndex));
    }).catch(function(error){
      console.log("[ERROR] - SongsIndex - " + error.message);
    })
  }


  if(loading){
    return(
      <p>Loading...</p>
    )
  } else {
    return(
      <div>
        <h1>Songs index</h1>
        <Link to={"./new"}>
          New song
        </Link>
        <hr />
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>

            {
              songs.map((song, i) => {
                return (
                  <tr>
                    <td>{song.name}</td>
                    <td><Link to={"./" + String(song._id)}>Show</Link></td>
                    <td><Link to={"./" + String(song._id) + "/edit"}>Edit</Link></td>
                    <td><Link to="#" songid={song._id} onClick={deleteLinkEvent} >Delete</Link></td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    )
  }

}

export default SongsIndex;
