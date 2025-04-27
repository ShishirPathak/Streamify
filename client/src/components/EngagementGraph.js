import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  ReferenceDot,
} from "recharts";
// ✅ Dummy engagement data


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const { retained, skipped, drop_off } = payload[0].payload;
    return (
      <div style={{ background: "#fff", padding: 10, border: "1px solid #ccc" }}>
        <p><strong>Time:</strong> {label}s</p>
        <p><strong>Retention:</strong> {retained.toFixed(2)}%</p>
        {skipped && <p style={{ color: "#f59e0b" }}>⏩ Skipped by some users</p>}
        {drop_off && <p style={{ color: "red" }}>🚨 Drop-off detected</p>}
      </div>
    );
  }
  return null;
};

const EngagementGraph = ({ videoId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/engagement/${videoId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Engagement fetch error", err));
  }, [videoId]);

  // useEffect(() => {
  //   // Simulate API call delay with dummy data
  //   const timer = setTimeout(() => {
  //     setData(sampleEngagementData);
  //   }, 500); // 0.5s delay to simulate fetch
  //   return () => clearTimeout(timer);
  // }, []);
  // useEffect(() => {
  //   const dummy = [];
  //   let retained = 100;
  
  //   for (let i = 0; i <= 200; i++) {
  //     // Drop off in the beginning
  //     if (i < 30) retained -= Math.random() * 1.2;
  
  //     // Mid video dip
  //     else if (i >= 30 && i <= 120) retained -= Math.random() * 0.3;
  
  //     // Random re-engagement spike
  //     if (i === 60 || i === 150) retained += Math.random() * 10;
  
  //     // Last 20 seconds sharp drop
  //     if (i >= 180) retained -= Math.random() * 4;
  
  //     retained = Math.max(0, Math.min(100, retained)); // clamp
  
  //     dummy.push({
  //       time: i,
  //       retained: +retained.toFixed(2),
  //       drop_off: i % 47 === 0,
  //       skipped: i % 37 === 0,
  //     });
  //   }
  
  //   setData(dummy);
  // }, []);

  if (!data.length) return <p style={{ marginLeft: "1%" }}>No retention data available.</p>;

  return (
    <div style={{ width: "90%", marginLeft: "1%", marginTop: "2rem" }}>
      <h3>Viewer Retention Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time">
            <Label value="Time (seconds)" position="insideBottom" offset={-5} />
          </XAxis>
          <YAxis domain={[0, 100]}>
            <Label value="Retention (%)" angle={-90} position="insideLeft" />
          </YAxis>

          {/* ✅ Smooth fill under the line */}
          <Area
            type="natural"
            dataKey="retained"
            stroke="none"
            fill="url(#retentionGradient)"
            fillOpacity={1}
            isAnimationActive={false}
          />

          {/* ✅ ECG-style smooth line */}
          <Line
            type="natural"
            dataKey="retained"
            stroke="#1e40af"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />

          {/* 🔴 Drop-off markers */}
          {data
            .filter((d) => d.drop_off)
            .map((d, i) => (
              <ReferenceDot
                key={`dot-${i}`}
                x={d.time}
                y={d.retained}
                r={5}
                fill="red"
                stroke="none"
                label={{
                  value: "Drop-off",
                  position: "top",
                  fill: "red",
                  fontSize: 12,
                }}
              />
            ))}

          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementGraph;



