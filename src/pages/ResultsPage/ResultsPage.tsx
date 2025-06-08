import { VacanciesTable } from '../../components';
import { useLocation } from 'react-router-dom';

export const ResultsPage = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Результаты поиска</h2>
      <VacanciesTable vacancies={data} />
    </div>
  );
};