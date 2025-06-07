import styles from './MainPage.module.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export const MainPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/filter')
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Salary Radar</h2>
            <div className={styles.block}>
                <Button variant="success" className={styles.button} onClick={handleClick}>
                    Настроить фильтры
                </Button>
            </div>
        </div>
    );
};