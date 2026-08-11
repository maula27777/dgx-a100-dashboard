import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/process.css";
import ProcessAccordion from "../components/ProcessAccordion";

export default function Process() {
  const [processData, setProcessData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-dummy-dashboard.halkh-systems.com/container")
      .then((response) => {
        setProcessData(response.data.data || []);
      })
      .catch((error) => {
        console.error("Gagal mengambil data process:", error);
      });
  }, []);

  return (
    <div className="process-page">

      <div className="process-title">
        <h1>Process Monitoring</h1>

        <p className="subtitle">
          Monitor running workloads on DGX A100.
        </p>
      </div>

      {processData.map((item, index) => (
        <ProcessAccordion
          key={`${item.id_mesin}-${item.container}-${index}`}
          data={item}
        />
      ))}

    </div>
  );
}