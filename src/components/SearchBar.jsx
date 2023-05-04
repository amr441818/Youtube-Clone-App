import React from "react";
import { Paper, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
const SearchBar = () => {
  const [searchData, setsearchData] = useState("");
  const navigate = useNavigate();
  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`search/${searchData}`);
        setsearchData("");
      }}
      sx={{
        borderRadius: 20,
        pl: 2,
        border: "1px solid #e3e3e3",
        boxShadow: "none",
        mr: { sm: 5 },
      }}
    >
      <input
        className="search-bar"
        placeholder="search.."
        value={searchData}
        onChange={(e) => {
          setsearchData(e.target.value);
        }}
      />
      <IconButton type="submit" sx={{ p: "10px", color: "red" }}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
