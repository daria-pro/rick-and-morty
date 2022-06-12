import {
  Container,
  List,
  ListSubheader,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { DataContext } from "./DataContext";
import "./styles.css";

const Character = (props) => {
  const [character, setCharacter] = useState({});
  const { favorites, setFavorites } = props;
  const { items } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const getCharacter = () => {
    const filteredCharacter = items.filter((item) => item.id == id);
    setCharacter(filteredCharacter[0]);
  };

  useEffect(() => {
    getCharacter();
  }, [id, character]);

  const goBack = () => {
    navigate(-1);
  };

  const addFav = (item) => {
    let array = favorites;
    let addArray = true;
    array.map((favItem, key) => {
      if (favItem === item.id) {
        array.splice(key, 1);
        addArray = false;
      }
    });
    if (addArray) {
      array.push(item.id);
    }
    setFavorites([...array]);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    let storage = localStorage.getItem("favItem" + item.id || "0");
    if (storage == null) {
      localStorage.setItem("favItem" + item.id, JSON.stringify(item));
    } else {
      localStorage.removeItem("favItem" + item.id);
    }
  };

  return (
    <>
      {Object.keys(character).length > 0 && (
        <Container maxWidth="sm" className="character-container">
          <div>
            <div className="title-container">
              <Typography
                variant="h6"
                sx={{ fontSize: "20px", fontWeight: "600", lineHeight: "48px" }}
              >
                {character.name}
              </Typography>
              <IconButton>
                {favorites && favorites.includes(character.id) ? (
                  <IoIosHeart
                    onClick={() => addFav(character)}
                    style={{ color: "red" }}
                  />
                ) : (
                  <IoIosHeartEmpty
                    onClick={() => addFav(character)}
                    style={{ color: "red" }}
                  />
                )}
              </IconButton>
            </div>
            <Typography> Gender: {character.gender}</Typography>
            <Typography> Species: {character.species}</Typography>
            <Typography>Location: {character.location.name}</Typography>
            <Typography>Status: {character.status}</Typography>
            <Typography>Created: {character.created}</Typography>
          </div>
          <List
            itemCount={items.length}
            sx={{
              overflow: "auto",
              maxHeight: 300,
              maxWidth: 360,
            }}
            subheader={<li />}
          >
            <li>
              <ul className="list">
                <ListSubheader className="list-subheader">
                  Episodes
                </ListSubheader>
                {character.episode.map((item) => (
                  <ListItem key={character.id} component="div" disablePadding>
                    <ListItemButton sx={{ padding: 0 }}>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </ul>
            </li>
          </List>
          <Button
            sx={{ marginTop: "20px", height: "50px", width: "150px" }}
            variant="outlined"
            onClick={goBack}
          >
            go back
          </Button>
        </Container>
      )}
    </>
  );
};

export default Character;
