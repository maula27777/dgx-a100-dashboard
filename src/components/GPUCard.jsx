export default function GPUCard({ gpu }) {
  return (
    <div className="gpu-card">

      <h2>GPU {gpu.gpu_id}</h2>

      <div className="gpu-item">
        <span>Machine</span>
        <strong>{gpu.nama_mesin}</strong>
      </div>

      <div className="gpu-item">
        <span>Temperature</span>
        <strong>{gpu.temp} °C</strong>
      </div>

      <div className="gpu-item">
        <span>Utilization</span>
        <strong>{(gpu.util * 100).toFixed(0)}%</strong>
      </div>

      <div className="gpu-item">
        <span>Memory</span>
        <strong>{gpu.mem} MB</strong>
      </div>

      <div className="gpu-item">
        <span>Power</span>
        <strong>{gpu.power} W</strong>
      </div>

    </div>
  );
}