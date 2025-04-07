// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   Legend, ResponsiveContainer, CartesianGrid, Label
// } from "recharts";

// const ReplayForwardTimeline = ({ videoId }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5001/api/replayForward/${videoId}`)
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Replay-Forward fetch error", err));
//   }, [videoId]);

//   if (!data.length) return <p style={{ marginLeft: "1%" }}>No replay/forward data available.</p>;

//   return (
//     <div style={{ width: "90%", marginLeft: "1%", marginTop: "2rem" }}>
//       <h3>Replay vs Forward Timeline</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="time">
//             <Label value="Time (seconds)" offset={-5} position="insideBottom" />
//           </XAxis>
//           <YAxis>
//             <Label value="Count" angle={-90} position="insideLeft" />
//           </YAxis>
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="rewind" fill="#34d399" name="Rewind" />
//           <Bar dataKey="forward" fill="#f97316" name="Forward" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ReplayForwardTimeline;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer, CartesianGrid, Label
} from "recharts";

const ReplayForwardTimeline = ({ videoId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/replayForward/${videoId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Replay-Forward fetch error", err));
  }, [videoId]);

  if (!data.length) return <p style={{ marginLeft: "1%" }}>No replay/forward data available.</p>;

  return (
    <div style={{ width: "90%", marginLeft: "1%", marginTop: "2rem" }}>
      <h3>Replay vs Forward Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time">
            <Label value="Time (seconds)" position="insideBottom" offset={-5} />
          </XAxis>

          <YAxis allowDecimals={false}>
            <Label value="Count" angle={-90} position="insideLeft" />
          </YAxis>

          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="rewind"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Rewind"
          />
          <Line
            type="monotone"
            dataKey="forward"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            name="Forward"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReplayForwardTimeline;
