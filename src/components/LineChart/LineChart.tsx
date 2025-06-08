import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  title: string;
  labels: string[];
  values: number[];
}

export const LineChart: React.FC<LineChartProps> = ({ title, labels, values }) => {

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: '#021526',
        backgroundColor: '#021526',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };


  return <Line data={data} options={options} />;
}