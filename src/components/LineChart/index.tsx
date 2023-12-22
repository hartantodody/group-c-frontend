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

  useEffect(() => {
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
              fill: false,
              borderColor: "#005792",
              tension: 0.3,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
    animation: false,
  };

  return (
    <div>
      <Typography variant='h6'>Weekly Report</Typography>
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
