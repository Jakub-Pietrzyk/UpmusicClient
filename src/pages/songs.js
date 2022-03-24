import React from 'react';
import { Outlet } from 'react-router-dom';

class Songs extends React.Component {

  constructor(props) {
    super(props);
    console.log("Songs constructor");
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Outlet />
    );
  }
}

export default Songs;
