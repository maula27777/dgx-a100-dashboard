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

import "../styles/storage.css";

function Storage() {
  const MACHINE_ID =
    "5DC4646C-EEF7-4531-A29E-C79C100C44CC";

  const [storageData, setStorageData] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/storage/${MACHINE_ID}`)
      .then((response) => {
        setStorageData(response.data.data || []);
      })
      .catch((error) => {
        console.error("Gagal mengambil data storage:", error);
        setStorageData([]);
      });
  }, []);

  const latestData =
    storageData.length > 0
      ? storageData[storageData.length - 1]
      : null;

  if (!latestData) {
    return (
      <div className="storage-page">
        <div className="storage-header">
          <div>
            <h1>Storage Monitoring</h1>
            <p>
              Storage resource monitoring for DGX A100 Monitoring.
            </p>
          </div>
        </div>

        <div className="storage-loading">
          Loading storage data...
        </div>
      </div>
    );
  }

  return (
    <div className="storage-page">

      {/* HEADER */}
      <div className="storage-header">
        <div>
          <h1>Storage Monitoring</h1>
          <p>
            Storage resource monitoring for DGX A100 Monitoring.
          </p>
        </div>
      </div>

      {/* STORAGE GRID */}
      <div className="storage-grid">

        {/* STORAGE USAGE */}
        <div className="storage-card">
          <h2>Storage Usage</h2>

          <div className="storage-chart">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={storageData}>
                <XAxis dataKey="datetime" />

                <YAxis
                  domain={[0, 1]}
                  tickFormatter={(value) =>
                    `${Math.round(value * 100)}%`
                  }
                />

                <Tooltip
                  formatter={(value) => [
                    `${Math.round(value * 100)}%`,
                    "Storage Usage",
                  ]}
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

        {/* READ SPEED */}
        <div className="storage-card">
          <h2>Read Speed</h2>

          <div className="storage-chart">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={storageData}>
                <XAxis dataKey="datetime" />

                <YAxis />

                <Tooltip
                  formatter={(value) => [
                    `${value}`,
                    "Read Speed",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="rs"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* WRITE SPEED */}
        <div className="storage-card">
          <h2>Write Speed</h2>

          <div className="storage-chart">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={storageData}>
                <XAxis dataKey="datetime" />

                <YAxis />

                <Tooltip
                  formatter={(value) => [
                    `${value}`,
                    "Write Speed",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="ws"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CURRENT USAGE */}
        <div className="storage-card">
          <h2>Current Usage</h2>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${latestData.usage * 100}%`,
              }}
            ></div>
          </div>

          <h3>
            {Math.round(latestData.usage * 100)}% Used
          </h3>
        </div>

      </div>

      {/* STORAGE STATUS */}
      <div className="status-box">

        <h2>Storage Status</h2>

        <div className="status-row">
          <span>Machine</span>
          <strong>{latestData.nama_mesin}</strong>
        </div>

        <div className="status-row">
          <span>Storage Usage</span>
          <strong>
            {Math.round(latestData.usage * 100)}%
          </strong>
        </div>

        <div className="status-row">
          <span>Read Speed</span>
          <strong>{latestData.rs}</strong>
        </div>

        <div className="status-row">
          <span>Write Speed</span>
          <strong>{latestData.ws}</strong>
        </div>

        <div className="status-row">
          <span>Last Update</span>
          <strong>{latestData.datetime}</strong>
        </div>

      </div>

    </div>
  );
}

export default Storage;