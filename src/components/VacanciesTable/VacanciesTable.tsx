import React from 'react';

interface Vacancy {
  id: string;
  title: string;
  city: string;
  employer: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  currency: string | null;
  professionalRoles: string;
  publishedAt: string;
}

interface VacanciesTableProps {
  vacancies: Vacancy[];
}

export const VacanciesTable: React.FC<VacanciesTableProps> = ({ vacancies }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={th}>Название</th>
            <th style={th}>Город</th>
            <th style={th}>Работодатель</th>
            <th style={th}>Зарплата</th>
            <th style={th}>Роль</th>
            <th style={th}>Дата публикации</th>
          </tr>
        </thead>
        <tbody>
          {vacancies.map((vacancy) => (
            <tr key={vacancy.id}>
              <td style={td}>{vacancy.title}</td>
              <td style={td}>{vacancy.city}</td>
              <td style={td}>{vacancy.employer}</td>
              <td style={td}>
                {formatSalary(vacancy.salaryFrom, vacancy.salaryTo, vacancy.currency)}
              </td>
              <td style={td}>{vacancy.professionalRoles}</td>
              <td style={td}>{new Date(vacancy.publishedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Стили
const th: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
  fontWeight: 'bold',
  textAlign: 'left',
};

const td: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
};

// Форматирование зарплаты
const formatSalary = (
  from: number | null,
  to: number | null,
  currency: string | null
): string => {
  if (!from && !to) return 'Не указано';
  if (from && to) return `${from.toLocaleString()}–${to.toLocaleString()} ${currency ?? ''}`;
  if (from && !to) return `от ${from.toLocaleString()} ${currency ?? ''}`;
  if (!from && to) return `до ${to.toLocaleString()} ${currency ?? ''}`;
  return '';
};