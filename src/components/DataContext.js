import React, { useEffect, useState } from "react";

export const DataContext = React.createContext({});

export const DataProvider = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <DataContext.Provider value={{ error, isLoaded, items }}>
      {props.children}
    </DataContext.Provider>
  );
};
