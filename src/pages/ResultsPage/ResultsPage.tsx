import styles from './ResultsPage.module.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { BarChart, LineChart, PieChart, LoadingPage } from '../../components';
import { useEffect, useState } from 'react';

interface VacancyData {
    jobTitle: string;
    from: number;
    to: number;
    average: number;
    median: number;
    quantity: number;
    vacancies: {
        name: string;
        horizontal: number[];
        vertical: number[];
    };
    education: {
        name: string;
        labels: string[];
        data: number[];
    };
    yearMoney: {
        name: string;
        horizontal: string[];
        vertical: number[];
    }
}

const fakeFetch = () =>
    new Promise<VacancyData>(resolve =>
        setTimeout(() => {
            resolve({
                jobTitle: 'Водитель',
                from: 60000,
                to: 250000,
                average: 145000,
                median: 140000,
                quantity: 1200,
                vacancies: {
                    name: 'Зарплаты по количеству вакансий',
                    horizontal: [30000, 40000, 50000, 60000, 70000, 80000],
                    vertical: [10, 50, 80, 60, 30, 15],
                },
                education: {
                    name: 'Формат работы',
                    labels: ['На месте работодателя', 'Удалённо', 'Гибрид', 'Разъездной'],
                    data: [40, 28, 120, 300],
                },
                yearMoney: {
                    name: 'Опыт работы',
                    horizontal: ['Нет опыта', 'От 1 года до 3 лет', 'От 3 до 6 лет', 'Более 6 лет'],
                    vertical: [40000, 60000, 80000, 70000],
                }
            });
        }, 1000)
    );

export const ResultsPage = () => {
    const [data, setData] = useState<VacancyData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fakeFetch().then(response => {
            setData(response);
        });
    }, []);

    if (!data) return <LoadingPage/>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title_page}>Отчет</h2>
            </div>
            <div className={styles.grid_container}>
                <div className={styles.item1}>
                    <h3 className={styles.title_filter}>{data.jobTitle}</h3>
                    <p className={styles.text}>от {data.from} ₽ — <br/>до {data.to} ₽</p>
                    <div>
                        <span className={styles.mini_header}>средняя зарплата</span>
                        <p className={styles.text}>{data.average} ₽</p>
                    </div>
                    <div>
                        <span className={styles.mini_header}>медиана</span>
                        <p className={styles.text}>{data.median} ₽</p>
                    </div>
                    <div>
                        <span className={styles.mini_header}>обработано вакансий</span>
                        <p className={styles.text}>{data.quantity}</p>
                    </div>
                </div>
                <div className={styles.item2}>
                    <BarChart
                        title={data.vacancies.name}
                        labels={data.vacancies.horizontal}
                        values={data.vacancies.vertical}
                    />
                </div>
                <div className={styles.item1}>
                    <PieChart
                        title={data.education.name}
                        labels={data.education.labels}
                        values={data.education.data}
                    />
                </div>
                <div className={styles.item2}>
                    <LineChart
                        title={data.yearMoney.name}
                        labels={data.yearMoney.horizontal}
                        values={data.yearMoney.vertical}
                    />
                </div>
            </div>

            <Button variant="success" className={styles.button}>Выгрузить PDF </Button>

            <Button variant="success" onClick={() => navigate('/filter')} className={`${styles.button} ${styles.button_back}`}>
                Новый поиск
            </Button>
        </div>
    );
};