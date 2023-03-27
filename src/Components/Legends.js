import React from "react";

export default function Legends({ type }) {
  const backgroundColors = ["#842029", "#0f5132", "#664d03", "#332c2e"];
  const backgroundColor = backgroundColors[type];

  return (
    <div
      className="legend-container"
      style={{
        backgroundColor: backgroundColor,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      <span>test</span>
    </div>
  );
}
