import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { CircularProgress, Typography } from "@mui/material";
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

const LineChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetchGetReport();
      const responseData: ReportEntry[] = response.data;

      const chartData = {
        x: responseData.map((entry) => entry.date),
        y: responseData.map((entry) => Number(entry.category)),
        type: "scatter",
        mode: "lines+markers",
        fill: "toself",
        fillcolor: "rgba(83, 205, 226, 0.2)",
        line: { color: "#53CDE2" },
        marker: { color: "#53CDE2" },
      };

      setChartData([chartData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const layout = {
    xaxis: {
      type: "category" as const,
      title: "Date",
      ticks: "inside" as const,
      tickfont: {
        color: "white",
      },
    },
    yaxis: {
      title: "Category",
      ticks: "inside" as const,
      tickfont: {
        color: "white",
      },
      range: [0, 100],
      tickvals: [0, 25, 50, 75, 100],
      ticktext: ["0", "25", "50", "75", "100"],
    },
    margin: { t: 20, r: 10, l: 10, b: 20 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    autosize: true,
    responsive: true,
  };

  return (
    <div style={{ margin: "10px" }}>
      <Typography variant='h6' color='white'>
        Weekly Report
      </Typography>
      {chartData ? (
        <Plot
          data={chartData}
          layout={layout}
          config={{ responsive: true }}
          style={{ color: "white" }} // Change the color of the text
        />
      ) : (
        <>
          <CircularProgress color='info' />
          <Typography variant='body1' color='white'>
            Fetching report...
          </Typography>
        </>
      )}
    </div>
  );
};

export default LineChart;
