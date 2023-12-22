import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CircularProgress, Typography, Paper } from "@mui/material";
import { fetchGetReport } from "../../utils/fetchAPI";

export interface ReportEntry {
  id: number;
  date: string;
  userId: number;
  sleepActual: number;
  sleepTarget: number;
  stepsActual: number;
  stepsTarget: number;
  foodCaloriesActual: number;
  foodCaloriesTarget: number;
  waterActual: number;
  waterTarget: number;
  meditationActual: number;
  meditationTarget: number;
  mood: string;
  category: number;
}

const LineChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetchGetReport();
      const responseData: ReportEntry[] = response.data;

      const chartData = responseData.map((entry) => ({
        date: entry.date.split("T")[0],
        score: Number(entry.category),
      }));

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <Typography variant='h6' color='white'>
        Weekly Report
      </Typography>
      <Paper elevation={5} sx={{ borderRadius: 5, padding: "10px" }}>
        {chartData ? (
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='score' stroke='#53CDE2' activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <>
            <CircularProgress color='info' />
            <Typography variant='body1' color='white'>
              Fetching report...
            </Typography>
          </>
        )}
      </Paper>
    </div>
  );
};

export default LineChartComponent;
