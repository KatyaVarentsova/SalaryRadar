import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


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
        '#27465A', // тёмно-синий
        '#3C6374', // стальной
        '#457F8B', // сине-бирюзовый
        '#5D9B9E', // серо-бирюзовый
        '#79B3B2', // мятно-бирюзовый
        '#95CCC8', // светло-бирюзовый
        '#C6D9D5', // почти белый бирюзовый
        '#E8E4E0', // очень светлый серый
        '#8FA7B3', // дымчатый синий
        '#6E8A93', // серо-голубой
        '#4E6D73', // приглушённый синий
        '#2E4F54', // глубокий морской
      ],
        borderWidth: 0,
      },
    ],
  };


  return <Pie data={data} />;
}