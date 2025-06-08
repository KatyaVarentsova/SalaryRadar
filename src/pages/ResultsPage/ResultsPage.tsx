import { VacanciesTable } from '../../components';
import { useLocation } from 'react-router-dom';
import styles from './ResultsPage.module.css';

export const ResultsPage = () => {
  const location = useLocation();
  const { vacancies, report } = location.state || {};

  if (!vacancies || !report) return <div>Загрузка...</div>;

  return (
    <div className={styles.container}>
      {/* Отчет */}
      <div className={styles.report}>
        <h3 className={styles.subtitle}>Отчёт</h3>

        <ul className={styles.reportList}>
          <li><strong>Средняя зарплата (от):</strong> {Math.round(report.averageSalaryFrom)} ₽</li>
          <li><strong>Средняя зарплата (до):</strong> {Math.round(report.averageSalaryTo)} ₽</li>
          <li><strong>Средняя итоговая зарплата:</strong> {Math.round(report.averageTotalSalary)} ₽</li>
          <li><strong>Медианная зарплата:</strong> {Math.round(report.medianSalary)} ₽</li>
          <li><strong>Количество вакансий:</strong> {report.count}</li>
          <li><strong>salaryDistribution:</strong> {report.salaryDistribution}</li>
          <li><strong>scheduleCounts:</strong> {report.scheduleCounts}</li>
          <li><strong>averageSalaryBySchedule:</strong> {report.averageSalaryBySchedule}</li>
        </ul>

      </div>

      <h2 className={styles.title_page}>Результаты поиска</h2>

      <VacanciesTable vacancies={vacancies} />
    </div>
  );
};