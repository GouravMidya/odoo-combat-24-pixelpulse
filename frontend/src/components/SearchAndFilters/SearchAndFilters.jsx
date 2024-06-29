import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  FormControlLabel,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const SearchAndFilter = ({ onSearch }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    amenities: [],
  });
  const [amenitiesList, setAmenitiesList] = useState([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get("/api/amenities");
        setAmenitiesList(response.data);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };
    fetchAmenities();
  }, []);

  const handleSearch = () => {
    const filtersToSend = {
      ...filters,
      searchTerm: searchTerm.trim(),
    };
    onSearch(filtersToSend);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilters({
      location: "",
      type: "",
      amenities: [],
    });
    onSearch({});
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        label="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FormControl className={classes.formControl}>
        <InputLabel>Location</InputLabel>
        <Select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <MenuItem value="">Select location...</MenuItem>
          <MenuItem value="indoor">Indoor</MenuItem>
          <MenuItem value="outdoor">Outdoor</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <MenuItem value="">Select type...</MenuItem>
          <MenuItem value="indoor">Indoor</MenuItem>
          <MenuItem value="outdoor">Outdoor</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Amenities</InputLabel>
        <Select
          multiple
          value={filters.amenities}
          onChange={(e) =>
            setFilters({
              ...filters,
              amenities: e.target.value,
            })
          }
          renderValue={(selected) => selected.join(", ")}
        >
          {amenitiesList.map((amenity) => (
            <MenuItem key={amenity._id} value={amenity.name}>
              <Checkbox checked={filters.amenities.indexOf(amenity.name) > -1} />
              <ListItemText primary={amenity.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSearch}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleClear}
      >
        Clear
      </Button>
    </form>
  );
};

export default SearchAndFilter;
