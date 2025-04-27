import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Tooltip, ResponsiveContainer, XAxis, Label, CartesianGrid, BarChart, Bar, Cell
} from "recharts";

const CustomHeatTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const { rewind } = payload[0].payload;
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: "6px" }}>
        <strong>{label}s</strong><br />
        🔁 {rewind} rewinds
      </div>
    );
  }
  return null;
};

const getGrayShade = (value, max) => {
  const percent = value / max;
  if (value === 0) return "#e5e7eb";      // gray-200
  if (percent <= 0.25) return "#d1d5db";  // gray-300
  if (percent <= 0.5) return "#9ca3af";   // gray-400
  if (percent <= 0.75) return "#6b7280";  // gray-500
  return "#374151";                       // gray-700 (most intense)
};

const MostRewatchedTimeline = ({ videoId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/replayForward/${videoId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Rewatch timeline error", err));
  }, [videoId]);

  if (!data.length) return <p style={{ marginLeft: "1%" }}>No rewatch heatmap data.</p>;

  const maxRewind = Math.max(...data.map(d => d.rewind || 0));

  return (
    <div style={{ width: "90%", marginLeft: "1%", marginTop: "2rem", marginBottom: "4rem" }}>
      <h3>Most Rewatched Timeline</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barCategoryGap={0}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="time" interval={Math.floor(data.length / 10)}>
            <Label value="Time (seconds)" position="insideBottom" offset={-5} />
          </XAxis>
          <Tooltip content={<CustomHeatTooltip />} />
          <Bar dataKey="rewind">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getGrayShade(entry.rewind, maxRewind)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div style={{ marginTop: "0.5rem", marginLeft: "10%", fontSize: "14px" }}>
        <span style={{ display: "inline-block", width: 15, height: 15, background: "#e5e7eb", marginRight: 6 }} /> No rewinds
        <span style={{ display: "inline-block", width: 15, height: 15, background: "#d1d5db", margin: "0 6px 0 16px" }} /> Low
        <span style={{ display: "inline-block", width: 15, height: 15, background: "#9ca3af", margin: "0 6px" }} /> Medium
        <span style={{ display: "inline-block", width: 15, height: 15, background: "#6b7280", margin: "0 6px" }} /> High
        <span style={{ display: "inline-block", width: 15, height: 15, background: "#374151", marginLeft: 6 }} /> Most rewatched
      </div>
    </div>
  );
};

export default MostRewatchedTimeline;
