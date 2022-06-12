import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Character from "./components/Character";
import { DataProvider } from "./components/DataContext";
import FavoriteCharacters from "./components/FavoriteCharacters";
import Characters from "./components/Characters";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                favorites={favorites}
                setFavorites={setFavorites}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            }
            exact
          />
          <Route
            path="/favorites"
            element={
              <FavoriteCharacters
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/character/:id"
            element={
              <Character favorites={favorites} setFavorites={setFavorites} />
            }
            exact
          />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
