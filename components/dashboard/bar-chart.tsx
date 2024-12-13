interface BarChartProps {
    data: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        color: string;
      }[];
    };
  }
  
  export function BarChart({ data }: BarChartProps) {
    const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data));
  
    return (
      <div className="w-full h-64">
        <svg width="100%" height="100%" viewBox="0 0 600 300">
          {data.labels.map((label, index) => (
            <g key={label} transform={`translate(${index * 100}, 0)`}>
              {data.datasets.map((dataset, datasetIndex) => (
                <rect
                  key={dataset.label}
                  x={datasetIndex * 40 + 10}
                  y={300 - (dataset.data[index] / maxValue) * 280}
                  width="30"
                  height={(dataset.data[index] / maxValue) * 280}
                  fill={dataset.color}
                />
              ))}
              <text x="50" y="295" textAnchor="middle" fontSize="12">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }
  
  