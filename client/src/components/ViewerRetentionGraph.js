import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Label, ReferenceDot
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const { retained, drop_off } = payload[0].payload;
    return (
      <div style={{ background: "#fff", padding: 10, border: "1px solid #ccc" }}>
        <p><strong>Time:</strong> {label}s</p>
        <p><strong>Retention:</strong> {retained}%</p>
        {drop_off && <p style={{ color: "red", marginTop: 4 }}>🚨 Drop-off detected</p>}
      </div>
    );
  }
  return null;
};

const ViewerRetentionGraph = ({ videoId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/retention/${videoId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error loading retention", err));
  }, [videoId]);

  if (!data.length) return <p style={{ marginLeft: "10%" }}>No retention data available.</p>;

  return (
    <div style={{ width: "90%", marginLeft: "10%", marginTop: "2rem" }}>
      <h3>Viewer Retention Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time">
            <Label value="Time (seconds)" position="insideBottom" offset={-5} />
          </XAxis>
          <YAxis domain={[0, 100]}>
            <Label value="Retention (%)" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="retained"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={false}
          />
          {data
            .filter((d) => d.drop_off)
            .map((d, i) => (
              <ReferenceDot
                key={i}
                x={d.time}
                y={d.retained}
                r={5}
                fill="red"
                stroke="none"
                label={{ value: "Drop-off", position: "top", fill: "red", fontSize: 12 }}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViewerRetentionGraph;
