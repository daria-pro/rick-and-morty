import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { List } from "react-virtualized";
import { DataContext } from "./DataContext";

const FavoriteCharacters = (props) => {
  let existingEntries = JSON.parse(localStorage.getItem("favorites"));
  const { items } = useContext(DataContext);
  const favoriteItems = items.filter((item) =>
    existingEntries.includes(item.id)
  );
  const { favorites, setFavorites } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let existingEntries = JSON.parse(localStorage.getItem("favorites"));
    if (existingEntries == null)
      localStorage.setItem("favorites", JSON.stringify([]));
    const getArray = JSON.parse(localStorage.getItem("favorites" || "0"));

    if (getArray !== 0) {
      setFavorites(getArray);
    }
  }, []);

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

  const renderRow = ({ index, key }) => {
    const { id, name, status } = favoriteItems[index];
    return (
      <>
        <ListItem
          alignItems="center"
          key={key}
          secondaryAction={
            <>
              <IconButton edge="end">
                {favorites && favorites.includes(id) ? (
                  <IoIosHeart
                    onClick={() => addFav(favoriteItems[index])}
                    style={{ color: "red" }}
                  />
                ) : (
                  <IoIosHeartEmpty
                    onClick={() => addFav(favoriteItems[index])}
                    style={{ color: "red" }}
                  />
                )}
              </IconButton>
            </>
          }
        >
          <Link className="list-link" to={`/character/${id}`}>
            <ListItemAvatar>
              <Avatar alt={name} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {status}
                  </Typography>
                </>
              }
            />
          </Link>
        </ListItem>
        <Divider></Divider>
      </>
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h5" sx={{ padding: "30px 0" }}>
        Liked Characters
      </Typography>{" "}
      {favoriteItems.length > 0 ? (
        <List
          width={570}
          height={600}
          rowRenderer={renderRow}
          rowCount={favoriteItems.length}
          rowHeight={72}
        />
      ) : (
        <Typography variant="subtitle1" align="center">
          There is no liked characters.
        </Typography>
      )}
      <Button
        sx={{ height: "50px", width: "150px" }}
        variant="outlined"
        onClick={goBack}
      >
        go back
      </Button>
    </Container>
  );
};

export default FavoriteCharacters;
