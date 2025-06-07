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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = [10000, 20000, 30000, 40000, 50000];
const arr1 = [10, 25, 17, 14, 2]

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: arr1,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
