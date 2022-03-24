import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Songs from "./pages/songs";
import SongsIndex from "./components/songs/index";
import SongsNew from "./components/songs/new";
import SongsEdit from "./components/songs/edit";
import SongsShow from "./components/songs/show";


class App extends React.Component {

  render() {
    return (

      <Router>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />

          <Route path="songs" element={<Songs />}>
            <Route path="" element={<SongsIndex />} />
            <Route path="new" element={<SongsNew />} />
            <Route path=":id/edit" element={<SongsEdit />} />
            <Route exact path=":id" element={<SongsShow />} />
          </Route>

        </Routes>
      </Router>
    );
  }
}

export default App;
