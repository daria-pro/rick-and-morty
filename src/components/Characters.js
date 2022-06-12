import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { List } from "react-virtualized";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ListItem from "@mui/material/ListItem";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { DataContext } from "./DataContext";

const Characters = (props) => {
  const { error, isLoaded, items } = useContext(DataContext);
  const { favorites, setFavorites } = props;

  useEffect(() => {
    let existingEntries = JSON.parse(localStorage.getItem("favorites"));
    if (existingEntries == null)
      localStorage.setItem("favorites", JSON.stringify([]));
    const getArray = JSON.parse(localStorage.getItem("favorites" || "0"));

    if (getArray !== 0) {
      setFavorites(getArray);
    }
  }, []);

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
    const { id, name, status } = items[index];
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
                    onClick={() => addFav(items[index])}
                    style={{ color: "red" }}
                  />
                ) : (
                  <IoIosHeartEmpty
                    onClick={() => addFav(items[index])}
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress
          className="spinner"
          size={100}
          variant="indeterminate"
          disableShrink
        />
      </Box>
    );
  } else {
    return (
      <Container maxWidth="sm" sx={{ paddingBottom: "100px" }}>
        <Typography align="center" variant="h5" sx={{ padding: "30px 0 20px" }}>
          Rick and Morty Characters
        </Typography>
        <div className="search-container">
          <Autocomplete
            freeSolo
            disableClearable
            options={items}
            sx={{ width: 300, paddingLeft: "16px" }}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Link
                className="list-link"
                to={`/character/${option.id}`}
                key={option.id}
                {...props}
              >
                {option.name}
              </Link>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by name"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <NavLink className="navlink" to={"/favorites"}>
            <Button variant="outlined" sx={{ height: "56px" }}>
              Liked Characters
            </Button>
          </NavLink>
        </div>
        <List
          width={570}
          height={600}
          rowRenderer={renderRow}
          rowCount={items.length}
          rowHeight={72}
        />
      </Container>
    );
  }
};

export default Characters;
