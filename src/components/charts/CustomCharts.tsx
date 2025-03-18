import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

interface ChartProps {
  data: any;
  options?: any;
}

export const TimelineChart = ({ data, options }: ChartProps) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Activity Timeline'
      }
    }
  };

  return (
    <Line
      data={data}
      options={{ ...defaultOptions, ...options }}
    />
  );
};

export const DistributionChart = ({ data, options }: ChartProps) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      }
    }
  };

  return (
    <Doughnut
      data={data}
      options={{ ...defaultOptions, ...options }}
    />
  );
};

export const ComparisonChart = ({ data, options }: ChartProps) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Bar
      data={data}
      options={{ ...defaultOptions, ...options }}
    />
  );
};