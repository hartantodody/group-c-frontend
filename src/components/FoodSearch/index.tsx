import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import { foodData } from "../../utils/foodData";
import { FoodItem } from "../../interfaces/interface";
import Swal from "sweetalert2";
import "./index.css";
import { fetchAddFoodConsumed } from "../../utils/fetchAPI";

const FoodSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredFoodData, setFilteredFoodData] = useState<FoodItem[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [isSearchListOpen, setIsSearchListOpen] = useState<boolean>(true);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFoodData([]);
      return;
    }

    const filteredData = foodData.filter((item) => item.foodName!.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredFoodData(filteredData);
  }, [searchTerm, isSearchListOpen]);

  const handleItemClick = (selectedFood: FoodItem) => {
    setSelectedFoods((prevSelectedFoods) => {
      const isAlreadySelected = prevSelectedFoods.some((food) => food.id === selectedFood.id);

      if (!isAlreadySelected) {
        return [...prevSelectedFoods, selectedFood];
      }

      return prevSelectedFoods;
    });

    setIsSearchListOpen(true);

    setSearchTerm("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredFoodData([]);
    setIsSearchListOpen(true);
  };

  const handleDeleteSelected = (foodId: number) => {
    setSelectedFoods((prevSelectedFoods) => prevSelectedFoods.filter((food) => food.id !== foodId));
  };

  const handleAddFoodConsumed = async () => {
    try {
      const foodNames = selectedFoods.map((food) => food.foodName) as string[];
      const response = await fetchAddFoodConsumed(foodNames);
      Swal.fire({
        icon: "error",
        title: "Error adding food data",
        text: `${response.message}`,
        confirmButtonText: "OK",
        confirmButtonColor: "#005792",
      });
      alert("All selected foods consumed successfully!");
      setSelectedFoods([]);
      setIsSearchListOpen(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error adding food data",
        text: `${error}`,
        confirmButtonText: "OK",
        confirmButtonColor: "#005792",
      });
    }
  };

  const titleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      <TextField
        label='Search for food...'
        variant='outlined'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClearSearch} edge='end'>
              <ClearIcon />
            </IconButton>
          ),
        }}
      />

      {searchTerm.trim() !== "" && isSearchListOpen && (
        <div className='search-list-container'>
          {filteredFoodData.length === 0 ? (
            <Typography>No matching results.</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableBody>
                  {filteredFoodData.map((item) => (
                    <TableRow key={item.id} onClick={() => handleItemClick(item)} className='search-list-item'>
                      <TableCell>{titleCase(item.foodName!)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}

      {selectedFoods.length > 0 && (
        <div className='food-consumed-container'>
          <Typography variant='h6'>Selected Foods:</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {selectedFoods.map((food) => (
                  <TableRow key={food.id}>
                    <TableCell>{titleCase(food.foodName!)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteSelected(food.id)} color='error'>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant='contained' color='primary' onClick={handleAddFoodConsumed}>
            Add to Consumed List
          </Button>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
