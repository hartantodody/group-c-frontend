import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchFoodConsumed } from "../../utils/fetchAPI";
import { FoodItem } from "../../interfaces/interface";

const ShowFoodConsumed: React.FC = () => {
  const [consumedFoodData, setConsumedFoodData] = useState<FoodItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFoodConsumed();
        setConsumedFoodData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setConsumedFoodData([]); // Set an empty array or handle error state accordingly
      }
    };

    fetchData();
  }, []);

  const titleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Check if consumedFoodData is not an array
  if (!Array.isArray(consumedFoodData)) {
    return <div>No data available</div>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Food Name</TableCell>
              <TableCell>Time Consumed</TableCell>
              <TableCell>Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consumedFoodData.map((food: FoodItem, number) => (
              <TableRow key={food.uniqueId}>
                <TableCell>{number + 1}</TableCell>
                <TableCell>{titleCase(food.foodName)}</TableCell>
                <TableCell>{food.timeConsumed}</TableCell>
                <TableCell>{food.calories} kcal</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShowFoodConsumed;
