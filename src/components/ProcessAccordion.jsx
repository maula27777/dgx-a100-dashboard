import { useState } from "react";
import "../styles/process.css";

export default function ProcessAccordion({ data }) {
  const [open, setOpen] = useState(false);

  const cpuUsage = `${Math.round(data.cpu_usage * 100)}%`;
  const gpuUsage = `${Math.round(data.gpu_usage * 100)}%`;
  const ramUsage = `${Math.round(data.ram * 100)}%`;

  return (
    <div className="accordion">

      <div
        className="accordion-header"
        onClick={() => setOpen(!open)}
      >

        <div>
          <h3>{data.container}</h3>
          <p>{data.nama_mesin}</p>
        </div>

        <div className="header-right">

          <span
            className={`status ${data.status.toLowerCase()}`}
          >
            {data.status}
          </span>

          <span className={`arrow ${open ? "rotate" : ""}`}>
            ▶
          </span>

        </div>

      </div>

      <div className={`accordion-body ${open ? "show" : ""}`}>

        <div className="info-box">
          <label>Machine</label>
          <strong>{data.nama_mesin}</strong>
        </div>

        <div className="info-box">
          <label>GPU Device</label>
          <strong>GPU {data.gpu_id}</strong>
        </div>

        <div className="info-box">
          <label>CPU Usage</label>
          <strong>{cpuUsage}</strong>
        </div>

        <div className="info-box">
          <label>GPU Usage</label>
          <strong>{gpuUsage}</strong>
        </div>

        <div className="info-box">
          <label>RAM Usage</label>
          <strong>{ramUsage}</strong>
        </div>

        <div className="info-box">
          <label>Network</label>
          <strong>{data.network}</strong>
        </div>

        <div className="info-box">
          <label>Status</label>
          <strong>{data.status}</strong>
        </div>

      </div>

    </div>
  );
}