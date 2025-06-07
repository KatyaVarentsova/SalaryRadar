import styles from './ResultsPage.module.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { BarChart } from '../../components';


export const ResultsPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/filter')
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Анализ вакансий</h2>
            <div className={styles.grid_container}>
                <div className={styles.item1}><BarChart/></div>
                

            </div>
            <Button variant="success" onClick={handleClick}>
                Вернуться к фильтрам
            </Button>
        </div>
    );
};