import { useLocation } from 'react-router-dom';

export const ResultsPage = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Полные данные:</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};