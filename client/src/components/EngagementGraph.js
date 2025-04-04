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

// export default EngagementGraph;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Label, ReferenceDot, Area
} from "recharts";

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
      .catch((err) => console.error("Retention fetch error", err));
  }, [videoId]);

  if (!data.length) return <p style={{ marginLeft: "10%" }}>No retention data available.</p>;

  return (
    <div style={{ width: "90%", marginLeft: "10%", marginTop: "2rem" }}>
      <h3>Viewer Retention Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="heatGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time">
            <Label value="Time (seconds)" position="insideBottom" offset={-5} />
          </XAxis>
          <YAxis domain={[0, 100]}>
            <Label value="Retention (%)" angle={-90} position="insideLeft" />
          </YAxis>

          {/* Heat-style area below the retention line */}
          <Area
            type="monotone"
            dataKey="retained"
            stroke="none"
            fill="url(#heatGradient)"
            fillOpacity={1}
          />

          {/* Retention line chart on top */}
          <Line
            type="monotone"
            dataKey="retained"
            stroke="#1e40af"
            strokeWidth={2}
            dot={false}
          />

          {/* Drop-off red dots */}
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

