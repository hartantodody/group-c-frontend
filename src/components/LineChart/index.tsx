import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface LineChartProps {
  apiUrl: string;
}

interface ChartDataPoint {
  x: string;
  y: number;
}

const LineChart: React.FC<LineChartProps> = ({ apiUrl }) => {
  const [chartData, setChartData] = useState<ChartData<"line", ChartDataPoint[]>>({
    labels: [],
    datasets: [
      {
        label: "Your Data",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Assuming your API response has a structure like { labels: [], datasets: [{ data: [] }] }
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Your Data",
              data: data.datasets[0].data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
