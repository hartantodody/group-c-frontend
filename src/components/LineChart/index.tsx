import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, ChartOptions, registerables } from "chart.js";
import "chartjs-adapter-luxon";
import { fetchPostReport, fetchGetReport } from "../../utils/fetchAPI";
import { CircularProgress, Typography } from "@mui/material";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ...registerables);

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

const LineChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  const fetchData = async () => {
    try {
      await fetchPostReport();

      const response = await fetchGetReport();
      const responseData: ReportEntry[] = response.data;

      const chartData = {
        labels: responseData.map((entry) => entry.date),
        datasets: [
          {
            label: "Categories Data",
            data: responseData.map((entry) => Number(entry.category)),
            fill: true,
            backgroundColor: "rgba(83, 205, 226, 0.2)",
            borderColor: "#005792",
            pointBackgroundColor: "#53CDE2",
            tension: 0.3,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      fetchData();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "white",
        },
      },
    },
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <div>
      <Typography variant='h6' color={"white"}>
        Weekly Report
      </Typography>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <>
          <CircularProgress color='info' />
          <Typography variant='body1' color={"white"}>
            Fetching report...
          </Typography>
        </>
      )}
    </div>
  );
};

export default LineChart;
