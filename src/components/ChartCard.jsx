import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/chartcard.css";

export default function ChartCard() {
  const [gpuUsage, setGpuUsage] = useState([]);

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((response) => {
        const data = response.data.data;

        const chartData = data
          .filter((item) => item.nama_mesin === "DGX A100 Gunadarma")
          .sort(
            (a, b) => new Date(a.datetime) - new Date(b.datetime)
          )
          .map((item) => ({
            time: new Date(item.datetime).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            usage: item.GPU * 100,
          }));

        setGpuUsage(chartData);
      })
      .catch((error) => {
        console.error("Gagal mengambil data GPU usage:", error);
      });
  }, []);

  return (
    <div className="chart-card">

      <div className="chart-header">
        <h3>GPU Usage Overview</h3>
        <span>Monitoring Data</span>
      </div>

      <div className="chart-container">

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={gpuUsage}>

            <XAxis dataKey="time" />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              formatter={(value) => [`${value}%`, "GPU Usage"]}
            />

            <Line
              type="monotone"
              dataKey="usage"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}