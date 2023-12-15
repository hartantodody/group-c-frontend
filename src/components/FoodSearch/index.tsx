import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { foodData } from "../../utils/foodData";
import { FoodItem } from "../../interfaces/interface";

const FoodSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredFoodData, setFilteredFoodData] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    const filteredData = foodData.filter((item) => item.foodName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredFoodData(filteredData);
  }, [searchTerm]);

  const handleItemClick = (selectedFood: FoodItem) => {
    setSelectedFood(selectedFood);
  };

  return (
    <div>
      <TextField
        label='Search for food...'
        variant='outlined'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredFoodData.length === 0 ? (
        <Typography>No matching results.</Typography>
      ) : (
        <List>
          {filteredFoodData.map((item) => (
            <ListItem key={item.id} onClick={() => handleItemClick(item)} button>
              {item.foodName}
            </ListItem>
          ))}
        </List>
      )}

      {selectedFood && (
        <div>
          <Typography variant='h6'>Selected Food:</Typography>
          <Typography>ID: {selectedFood.id}</Typography>
          <Typography>Name: {selectedFood.foodName}</Typography>
          <Typography>Calories: {selectedFood.calories}</Typography>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
