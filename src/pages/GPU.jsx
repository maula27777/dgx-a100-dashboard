import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/gpu.css";
import GPUCard from "../components/GPUCard";

export default function GPU() {
  const [gpuData, setGpuData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/gpu")
      .then((response) => {
        setGpuData(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data GPU:", error);
      });
  }, []);

  return (
    <div className="gpu-page">

      <h1>GPU Monitoring</h1>

      <p className="subtitle">
        Monitor GPU resource usage on DGX A100.
      </p>

      <div className="gpu-grid">

        {gpuData.map((gpu, index) => (
          <GPUCard
            key={`${gpu.id_mesin}-${gpu.gpu_id}-${index}`}
            gpu={gpu}
          />
        ))}

      </div>

    </div>
  );
}