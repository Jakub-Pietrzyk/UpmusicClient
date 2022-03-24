import React from 'react';
import { create } from "../../services/songs.service";
import { Navigate } from 'react-router-dom';

class SongsNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      songData: {
        name: ""
      },
      redirect: false,
      song_id: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log("SongsNew constructor");
  }

  componentDidMount() {

  }

  handleSubmit(event){
    event.preventDefault();

    create(this.state.songData).then(function(data){
      this.setState({redirect: true, song_id: data.id})
    }.bind(this)).catch(function(error){
      console.log("[ERROR] - SongsNew - " + error.message);
    })

  }

  handleChange(event){

    this.setState(prevState => {
      let songData = { ...prevState.songData };
      songData[event.target.name] = event.target.value;
      return { songData };
    })

  }

  render() {
    if (this.state.redirect){
      return(
        <Navigate replace to={"/songs/" + String(this.state.song_id)} />
      )
    } else {
      return (
        <div>
          <h1>New song</h1>

          <form onSubmit={this.handleSubmit}>
            <label>
              Nazwa:
              <input name="name" type="text" value={this.state.songData.name} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Wyślij" />
          </form>
        </div>
      );
    }
  }
}

export default SongsNew;
