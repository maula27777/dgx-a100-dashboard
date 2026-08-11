import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/container.css";

function Container() {
  const [containerData, setContainerData] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState(null);

  useEffect(() => {
    axios
      .get("/api/container")
      .then((response) => {
        setContainerData(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data container:", error);
      });
  }, []);

  return (
    <div className="container-page">

      <h1>Container Monitoring</h1>
      <p>Running container resource monitoring.</p>

      <div className="container-list">

        {containerData.map((item, index) => (

          <div
            className="container-card"
            key={`${item.id_mesin}-${item.container}-${index}`}
          >

            <div className="container-name">

              <h3>{item.container}</h3>

              <p>
                Machine:
                <span>{item.nama_mesin}</span>
              </p>

              <p>
                Container:
                <span>{item.container}</span>
              </p>

              <p>
                GPU Device:
                <span>GPU {item.gpu_id}</span>
              </p>

            </div>

            <div className="resource-box">
              <span>CPU</span>
              <strong>{(item.cpu_usage * 100).toFixed(0)}%</strong>
            </div>

            <div className="resource-box">
              <span>GPU</span>
              <strong>{(item.gpu_usage * 100).toFixed(0)}%</strong>
            </div>

            <div className="resource-box">
              <span>NET</span>
              <strong>{item.network}</strong>
            </div>

            <div className="resource-box">
              <span>RAM</span>
              <strong>{(item.ram * 100).toFixed(0)}%</strong>
            </div>

            <div className="resource-box">
              <span>Status</span>
              <strong>{item.status}</strong>
            </div>

            <button
              className="detail-btn"
              onClick={() => setSelectedContainer(item)}
            >
              Detail
            </button>

          </div>

        ))}

      </div>

      {/* DETAIL MODAL */}

      {selectedContainer && (

        <div
          className="detail-overlay"
          onClick={() => setSelectedContainer(null)}
        >

          <div
            className="detail-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="detail-header">

              <div>
                <h2>{selectedContainer.container}</h2>
                <p>Container Monitoring Detail</p>
              </div>

              <button
                className="close-btn"
                onClick={() => setSelectedContainer(null)}
              >
                ×
              </button>

            </div>

            <div className="detail-grid">

              <div className="detail-item">
                <span>Machine</span>
                <strong>{selectedContainer.nama_mesin}</strong>
              </div>

              <div className="detail-item">
                <span>Container</span>
                <strong>{selectedContainer.container}</strong>
              </div>

              <div className="detail-item">
                <span>GPU Device</span>
                <strong>GPU {selectedContainer.gpu_id}</strong>
              </div>

              <div className="detail-item">
                <span>CPU Usage</span>
                <strong>
                  {(selectedContainer.cpu_usage * 100).toFixed(0)}%
                </strong>
              </div>

              <div className="detail-item">
                <span>GPU Usage</span>
                <strong>
                  {(selectedContainer.gpu_usage * 100).toFixed(0)}%
                </strong>
              </div>

              <div className="detail-item">
                <span>RAM Usage</span>
                <strong>
                  {(selectedContainer.ram * 100).toFixed(0)}%
                </strong>
              </div>

              <div className="detail-item">
                <span>Network</span>
                <strong>{selectedContainer.network}</strong>
              </div>

              <div className="detail-item">
                <span>Status</span>
                <strong>{selectedContainer.status}</strong>
              </div>

            </div>

            <button
              className="close-detail-btn"
              onClick={() => setSelectedContainer(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Container;