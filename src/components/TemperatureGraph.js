import React from 'react';
import '../styling/global.css'; //
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const TemperatureGraph = ({ data }) => {
  console.log("aditya",data)
  const currentTime = new Date(); // Get the current time
  const formattedData = []; // Array to hold formatted data for x-axis labels

  // Generate x-axis labels for 2 hours before and after the current time
  for (let i = -2; i <= 2; i++) {
    const time = new Date(currentTime);
    time.setHours(time.getHours() + i);

    // Format the time to 'MM/dd ha' (e.g., '03/28 3pm')
    const formattedTime = time.toLocaleTimeString('en-US', {
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
    });

    formattedData.push({
      name: formattedTime,
      temp: null, // Assuming temp data is not available for these labels
    });
  }

  return (
    <div className="graph-container">
      <div className="graph-title">Temperature Graph</div>
      <div className="graph-chart">
        <LineChart width={800} height={200} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#ddd" tick={{ fill: '#ddd' }} />
          <YAxis stroke="#ddd" tick={{ fill: '#ddd' }} />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#FFD700" strokeWidth={2} dot={false} />
        </LineChart>
      </div>
    </div>
  );
};

export default TemperatureGraph;
