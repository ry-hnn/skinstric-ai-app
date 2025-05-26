import React from 'react';

const DonutChart = ({ percentage, size = 240, strokeWidth = 2 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const fontSize = Math.round(size / 6);

  return (
    <svg width={size} height={size} className="donut-chart">
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e6e6e6"
        fill="none"
        strokeWidth={strokeWidth}
      />

      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#000000"
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // starts at top
      />

      {/* Percentage Text */}
      <text
        x={size / 2}
        y={size / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="bold"
        fill="#333"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default DonutChart;
