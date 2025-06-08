import React from 'react';
import { useLocation } from 'react-router-dom';
import { VacanciesTable, BarChart, PieChart, LineChart, LoadingPage} from '../../components';
import styles from './ResultsPage.module.css';

// Типизация вакансии, можно дополнить нужными полями
interface VacancyType {
  id: string,
  title: string,
  city: string,
  employer: string,
  salaryFrom: number | null,
  salaryTo: number | null,
  currency: string,
  professionalRoles: string,
  publishedAt: string,
}

interface ReportType {
  averageSalaryFrom: number;
  averageSalaryTo: number;
  averageTotalSalary: number;
  medianSalary: number;
  count: number;
  salaryDistribution: Record<string, number>;
  scheduleCounts: Record<string, number>;
  averageSalaryBySchedule: Record<string, number>;
}

interface LocationState {
  vacancies: VacancyType[];
  report: ReportType;
}

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { vacancies, report } = (location.state as LocationState) || {};
   const { search } = useLocation();
  const params = new URLSearchParams(search);
  const jobTitle = params.get('jobTitle') || '';

  if (!vacancies || !report) return <LoadingPage/>;

  // данные для графика1
  const distributionEntries = Object.entries(report.salaryDistribution)
    .map(([salary, count]) => [Number(salary), count] as [number, number])
    .sort(([a], [b]) => a - b);

  const labels = distributionEntries.map(
    ([salary]) => salary.toLocaleString('ru-RU')
  );
  const values = distributionEntries.map(
    ([, count]) => count
  );

  //данный для графика2
  const scheduleEntries = Object.entries(report.scheduleCounts);
  const scheduleLabels = scheduleEntries.map(([mode]) => mode);
  const scheduleValues = scheduleEntries.map(([, cnt]) => cnt);

  //данные для графика3
  const scheduleSalaryEntries = Object.entries(report.averageSalaryBySchedule);
  const scheduleL = scheduleSalaryEntries.map(
    ([mode]) => mode
  );
  const scheduleV = scheduleSalaryEntries.map(
    ([, avgSalary]) => Math.round(avgSalary)
  );

  return (
    <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title_page}>Отчет</h2>
            </div>
            <div className={styles.grid_container}>
                <div className={styles.item1}>
                  <h3 className={styles.title_filter}>{jobTitle}</h3>
                    <p className={styles.text}>от {Math.round(report.averageSalaryFrom)} ₽ — <br/>до {Math.round(report.averageSalaryTo)} ₽</p>
                    <div>
                    <span className={styles.mini_header}>средняя зарплата</span>
                    <p className={styles.text}>{Math.round(report.averageTotalSalary)} ₽</p>
                  </div>
                  <div>
                    <span className={styles.mini_header}>медиана</span>
                    <p className={styles.text}>{Math.round(report.medianSalary)} ₽</p>
                  </div>
                  <div>
                    <span className={styles.mini_header}>обработано вакансий</span>
                    <p className={styles.text}>{Math.round(report.count)}</p>
                  </div>
                </div>

                <div className={styles.item2}>
                  {/* График распределения зарплат */}
                  <div className={styles.chartWrapper}>
                    <BarChart
                      title="Распределение зарплат"
                      labels={labels}
                      values={values}
                    />
                  </div>
                </div>
                
                <div className={styles.item1}> 
                  <PieChart
                    title="Тип занятости"
                    labels={scheduleLabels}
                    values={scheduleValues}
                  />
                </div>
                
                <div className={styles.item2}>
                  <LineChart
                    title="Средняя зарплата по формату работы"
                    labels={scheduleL}
                    values={scheduleV}
                  />
                </div>

            </div>
            

      

      <h2 className={styles.title_page}>Результаты поиска</h2>
      <VacanciesTable vacancies={vacancies} />
    </div>
  );
};
