interface PieChartProps {
    data: {
      labels: string[];
      datasets: {
        data: number[];
        backgroundColor: string[];
      }[];
    };
  }
  
  export function PieChart({ data }: PieChartProps) {
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;
  
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {data.datasets[0].data.map((value, index) => {
            const angle = (value / total) * 360;
            const endAngle = startAngle + angle;
            const largeArcFlag = angle > 180 ? 1 : 0;
            const [startX, startY] = getCoordinatesForAngle(startAngle);
            const [endX, endY] = getCoordinatesForAngle(endAngle);
  
            const pathData = [
              `M 100 100`,
              `L ${startX} ${startY}`,
              `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 100 100`,
            ].join(' ');
  
            startAngle = endAngle;
  
            return <path key={index} d={pathData} fill={data.datasets[0].backgroundColor[index]} />;
          })}
        </svg>
      </div>
    );
  }
  
  function getCoordinatesForAngle(angle: number): [number, number] {
    const x = 100 + 100 * Math.cos((angle - 90) * (Math.PI / 180));
    const y = 100 + 100 * Math.sin((angle - 90) * (Math.PI / 180));
    return [x, y];
  }
  
  