// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   CartesianGrid, Label, ReferenceDot, ReferenceArea
// } from "recharts";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload?.length) {
//     const { retained, skipped, drop_off } = payload[0].payload;
//     return (
//       <div style={{ background: "#fff", padding: 10, border: "1px solid #ccc" }}>
//         <p><strong>Time:</strong> {label}s</p>
//         <p><strong>Retention:</strong> {retained.toFixed(2)}%</p>
//         {skipped && <p style={{ color: "#f59e0b" }}>⏩ Skipped by some users</p>}
//         {drop_off && <p style={{ color: "red" }}>🚨 Drop-off detected</p>}
//       </div>
//     );
//   }
//   return null;
// };

// const EngagementGraph = ({ videoId }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5001/api/engagement/${videoId}`)
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Retention fetch error", err));
//   }, [videoId]);

//   if (!data.length) return <p style={{ marginLeft: "10%" }}>No retention data available.</p>;

//   const skippedRanges = [];
//   let skipStart = null;
//   data.forEach((d, i) => {
//     if (d.skipped) {
//       if (skipStart === null) skipStart = d.time;
//     } else if (skipStart !== null) {
//       skippedRanges.push({ start: skipStart, end: d.time });
//       skipStart = null;
//     }
//   });

//   return (
//     <div style={{ width: "90%", marginLeft: "10%", marginTop: "2rem" }}>
//       <h3>Smart Viewer Retention</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="time">
//             <Label value="Time (seconds)" position="insideBottom" offset={-5} />
//           </XAxis>
//           <YAxis domain={[0, 100]}>
//             <Label value="Retention (%)" angle={-90} position="insideLeft" />
//           </YAxis>
//           <Tooltip content={<CustomTooltip />} />
//           <Line type="monotone" dataKey="retained" stroke="#6366f1" strokeWidth={2} dot={false} />
//           {data
//             .filter((d) => d.drop_off)
//             .map((d, i) => (
//               <ReferenceDot
//                 key={i}
//                 x={d.time}
//                 y={d.retained}
//                 r={5}
//                 fill="red"
//                 label={{ value: "Drop-off", position: "top", fill: "red", fontSize: 12 }}
//               />
//             ))}
//           {skippedRanges.map((range, idx) => (
//             <ReferenceArea
//               key={idx}
//               x1={range.start}
//               x2={range.end}
//               y1={0}
//               y2={100}
//               strokeOpacity={0.3}
//               fill="#facc15"
//               fillOpacity={0.3}
//               label={{ value: "Skipped", position: "top", fill: "#92400e", fontSize: 10 }}
//             />
//           ))}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

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

// const sampleEngagementData = [
//   { time: 0, retained: 100 },
//   { time: 10, retained: 95 },
//   { time: 20, retained: 88 },
//   { time: 30, retained: 80 },
//   { time: 40, retained: 70 },
//   { time: 50, retained: 60 },
//   { time: 60, retained: 72, drop_off: false }, // 🔁 Replay spike
//   { time: 70, retained: 68 },
//   { time: 80, retained: 55, skipped: true },
//   { time: 90, retained: 50 },
//   { time: 100, retained: 48 },
//   { time: 110, retained: 42 },
//   { time: 120, retained: 35, drop_off: true }, // 🚨 Drop-off zone
//   { time: 130, retained: 22 },
//   { time: 140, retained: 15, skipped: true },
//   { time: 150, retained: 10 },
//   { time: 160, retained: 6 },
//   { time: 170, retained: 4 },
//   { time: 180, retained: 2 },
// ];


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
      .get(`http://localhost:5001/api/engagement/${videoId}`)
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



