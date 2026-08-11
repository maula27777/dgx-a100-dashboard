import "../styles/summarycard.css";
import {
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const data = [
  { value: 20 },
  { value: 35 },
  { value: 30 },
  { value: 55 },
  { value: 45 },
  { value: 70 },
  { value: 60 },
];

export default function SummaryCard({
  title,
  value,
  status,
}) {
  return (
    <div className="summary-card">

      <div className="summary-top">
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>

      <span>{status}</span>

      <div className="mini-chart">
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}