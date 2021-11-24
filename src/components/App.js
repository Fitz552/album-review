import {Routes, Route} from "react-router-dom"
import AlbumList from "./AlbumList";
import AlbumPage from "./AlbumPage";
import HomePage from "./Homepage";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path = "/" element={<HomePage/>}/>
      <Route exact path = "/albuns" element={<AlbumList/>}/>
      <Route exact path = "/albuns/:id" element={<AlbumPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
