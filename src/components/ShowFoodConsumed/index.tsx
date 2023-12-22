import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
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
        setConsumedFoodData([]);
      }
    };

    fetchData();
  }, []);

  const titleCase = (str: string | undefined) => {
    if (!str) return "";

    return str
      .toLowerCase()
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <Typography variant='h6' sx={{ margin: "25px" }}>
        Today's Food Consumed
      </Typography>
      <TableContainer component={Paper} elevation={5}>
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
            {consumedFoodData &&
              consumedFoodData.map((food: FoodItem, number) => (
                <TableRow key={food.uniqueId}>
                  <TableCell>{number + 1}</TableCell>
                  <TableCell>{titleCase(food.foodName)}</TableCell>
                  <TableCell>{food.timeConsumed}</TableCell>
                  <TableCell>{food.calories} kcal</TableCell>
                </TableRow>
              ))}
            {!consumedFoodData ||
              (consumedFoodData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align='center'>
                    No data
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShowFoodConsumed;
