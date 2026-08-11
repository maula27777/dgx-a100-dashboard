import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

import "../styles/dashboardoverview.css";

const MiniChart = ({ data, color }) => (
  <ResponsiveContainer width="100%" height={50}>
    <LineChart data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default function DashboardOverview() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    axios
      .get("https://api-dummy-dashboard.halkh-systems.com/dashboard")
      .then((response) => {
        const data = response.data.data;

        // Ambil data terbaru berdasarkan urutan datetime
        const latestData = [...data].sort(
          (a, b) => new Date(b.datetime) - new Date(a.datetime)
        );

        // Default: mesin pertama yang ditemukan
        setOverview(latestData[0]);
      })
      .catch((error) => {
        console.error("Gagal mengambil data dashboard:", error);
      });
  }, []);

  if (!overview) {
    return (
      <div className="overview-section">
        <div className="overview-header">
          <h2>Dashboard Overview</h2>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const cpu = overview.CPU * 100;
  const gpu = overview.GPU * 100;
  const ram = overview.RAM * 100;
  const storage = overview.storage * 100;

  const cpuData = [
    { value: 40 },
    { value: 42 },
    { value: 43 },
    { value: cpu },
  ];

  const gpuData = [
    { value: 70 },
    { value: 73 },
    { value: 75 },
    { value: gpu },
  ];

  const ramData = [
    { value: 55 },
    { value: 58 },
    { value: 60 },
    { value: ram },
  ];

  const storageData = [
    { value: 65 },
    { value: 67 },
    { value: 69 },
    { value: storage },
  ];

  return (
    <div className="overview-section">

      <div className="overview-header">
        <h2>Dashboard Overview</h2>
        <span>{overview.nama_mesin}</span>
      </div>

      <div className="overview-summary">

        <div className="overview-box">
          <h4>CPU</h4>
          <h1>{cpu.toFixed(0)}%</h1>
          <MiniChart data={cpuData} color="#38bdf8" />
        </div>

        <div className="overview-box">
          <h4>GPU</h4>
          <h1>{gpu.toFixed(0)}%</h1>
          <MiniChart data={gpuData} color="#22c55e" />
        </div>

        <div className="overview-box">
          <h4>RAM</h4>
          <h1>{ram.toFixed(0)}%</h1>
          <MiniChart data={ramData} color="#f59e0b" />
        </div>

        <div className="overview-box">
          <h4>Storage</h4>
          <h1>{storage.toFixed(0)}%</h1>
          <MiniChart data={storageData} color="#a855f7" />
        </div>

      </div>

    </div>
  );
}