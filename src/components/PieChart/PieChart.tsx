import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Типизация пропсов
interface PieChartProps {
  title: string;
  labels: string[];
  values: number[];
}
export const PieChart: React.FC<PieChartProps> = ({ title, labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: [
          '#27465A',
          '#3c6374',
          '#457f8b',
          '#c6d9d5',
        ],
        borderWidth: 0,
      },
    ],
  };


  return <Pie data={data} />;
}