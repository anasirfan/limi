import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * SlideInsights
 * @param {Object} props
 * @param {Object[]} props.slideTimes - Array of { slideId, slideTitle, seconds }
 * @param {Object[]} props.sessions - Array of { sessionStart, sessionEnd, durationSeconds }
 */
export default function SlideInsights({ slideTimes = [], sessions = [] }) {
  // Color palette for bars
  const colorPalette = [
    'rgba(84, 187, 116, 0.8)',    // Primary green
    'rgba(147, 207, 162, 0.8)',   // Light green
    'rgba(22, 163, 74, 0.8)',     // Dark green
    'rgba(21, 128, 61, 0.8)',     // Darker green
    'rgba(22, 101, 52, 0.8)',     // Deep green
    'rgba(74, 222, 128, 0.8)',    // Bright green
    'rgba(34, 197, 94, 0.8)',     // Lighter green
  ];

  // Prepare data for Chart.js
  const chartData = {
    labels: slideTimes.map(slide => slide.slideTitle),
    datasets: [
      {
        label: 'Time Spent (seconds)',
        data: slideTimes.map(slide => slide.seconds),
        backgroundColor: slideTimes.map((_, index) => {
          return colorPalette[index % colorPalette.length];
        }),
        borderColor: slideTimes.map((_, index) => {
          // Slightly darker version of each color for the border
          const baseColor = colorPalette[index % colorPalette.length];
          return baseColor.replace('0.8)', '1)').replace(', 0.8', '');
        }),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#93cfa2',
        bodyColor: '#93cfa2',
        borderColor: '#54bb74',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `Time: ${context.parsed.y.toFixed(1)}s`;
          }
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#93cfa2',
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: 'rgba(64, 64, 64, 0.3)',
          drawBorder: false,
        },
        border: {
          color: '#54bb74',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#93cfa2',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(64, 64, 64, 0.3)',
          drawBorder: false,
        },
        border: {
          color: '#54bb74',
        },
        title: {
          display: true,
          text: 'Time (seconds)',
          color: '#93cfa2',
          font: {
            size: 14,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="w-full" style={{ height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
