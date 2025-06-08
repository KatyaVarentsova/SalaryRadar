import styles from './FilterPage.module.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


export const FilterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        jobTitle: '',
        city: '',
        experience: {
            noExperience: false,
            from1To3: false,
            from3To6: false,
            moreThan6: false,
        },
        age: {
            age18_30: false,
            age30_40: false,
            age40_50: false,
            age60plus: false,
        },
        source: {
            hh: false,
        },
        education: '',
        workFormat: {
            onSite: false,
            remotely: false,
            hybrid: false,
            journey: false,

        },
        car: false,
        license: {
            A: false,
            B: false,
            C: false,
            D: false,
            E: false,
            BE: false,
            CE: false,
            DE: false,
            Tm: false,
            Tb: false,
        }


    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            jobTitle: formData.jobTitle,
            city: formData.city,
            experience: Object.entries(formData.experience)
                .filter(([_, checked]) => checked)
                .map(([label]) => label),
            age: Object.entries(formData.age)
                .filter(([_, checked]) => checked)
                .map(([label]) => label),
            source: Object.entries(formData.source)
                .filter(([_, checked]) => checked)
                .map(([label]) => label),
            education: '',
            workFormat: Object.entries(formData.workFormat)
                .filter(([_, checked]) => checked)
                .map(([label]) => label),
            car: formData.car.toString(), // Преобразуем boolean в строку
            license: Object.entries(formData.license)
                .filter(([_, checked]) => checked)
                .map(([label]) => label),
        };
        const qt = encodeURIComponent(formData.jobTitle);

        // Преобразуем payload в строку запроса
        const queryParams = new URLSearchParams();

        Object.entries(payload).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => queryParams.append(key, v));
            } else {
                queryParams.append(key, encodeURIComponent(String(value))); //  Преобразуем всё в строку
            }
        });

        const queryString = queryParams.toString();

        const filterUrl = `http://localhost:8081/api/v1/vacancies/filter?${queryString}`;
        const reportUrl = `http://localhost:8081/api/v1/vacancies/report?${queryString}`;

        try {
            // Параллельные запросы
            const [filterResponse, reportResponse] = await Promise.all([
                axios.get(filterUrl),
                axios.get(reportUrl)
            ]);

            console.log('Фильтрованные вакансии:', filterResponse.data);
            console.log('Отчёт:', reportResponse.data);

            // Передача обоих JSON через навигацию
            navigate(`/results?jobTitle=${qt}`, {
                state: {
                    vacancies: filterResponse.data,
                    report: reportResponse.data,
                }
            });
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title_page}>Поиск вакансий</h2>
            </div>
            <h3 className={styles.title_filter}>Фильтры</h3>
            <Form onSubmit={handleSubmit}>
                <div className={styles.block}>
                    <div className={styles.form_groups}>
                        {/* Должность */}
                        <Form.Group>
                            <Form.Label className={styles.from_label}>Должность</Form.Label>
                            <Form.Control required className={styles.from_text} type="text" placeholder="Доставщик" value={formData.jobTitle}
                                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} />
                        </Form.Group>
                        {/* Город */}
                        <Form.Group>
                            <Form.Label className={styles.from_label}>Город</Form.Label>
                            <Form.Control className={styles.from_text} type="text" placeholder="Москва" value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                        </Form.Group>
                        {/* Опыт работы */}
                        <Form.Group>
                            <Form.Label className={styles.from_label}>Опыт работы</Form.Label>
                            {[
                                ['noExperience', 'Нет опыта'],
                                ['from1To3', 'От 1 до 3 лет'],
                                ['from3To6', 'От 3 до 6 лет'],
                                ['moreThan6', 'Более 6 лет'],
                            ].map(([key, label]) => (
                                <Form.Check
                                    className={styles.from_text}
                                    key={key}
                                    type="checkbox"
                                    label={label}
                                    checked={formData.experience[key as keyof typeof formData.experience]}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            experience: {
                                                ...formData.experience,
                                                [key]: e.target.checked,
                                            },
                                        })
                                    }
                                />
                            ))}
                        </Form.Group>
                        {/* Возраст */}
                        <Form.Group className={styles.checkbox}>
                            <Form.Label className={styles.from_label}>Возраст</Form.Label>
                            {[
                                ['age18_30', '18 - 30'],
                                ['age30_40', '30 - 40'],
                                ['age40_50', '40 - 50'],
                                ['age60plus', 'от 60 лет'],
                            ].map(([key, label]) => (
                                <Form.Check
                                    className={styles.from_text}
                                    key={key}
                                    type="checkbox"
                                    label={label}
                                    checked={formData.age[key as keyof typeof formData.age]}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            age: {
                                                ...formData.age,
                                                [key]: e.target.checked,
                                            },
                                        })
                                    }
                                />
                            ))}
                        </Form.Group>
                        {/*Источники для поиска*/}
                        <Form.Group className={styles.checkbox}>
                            <Form.Label className={styles.from_label}>Источники для поиска</Form.Label>
                            {[
                                ['hh', 'HH.ru'],
                            ].map(([key, label]) => (
                                <Form.Check
                                    required
                                    className={styles.from_text}
                                    key={key}
                                    type="checkbox"
                                    label={label}
                                    checked={formData.source[key as keyof typeof formData.source]}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            source: {
                                                ...formData.source,
                                                [key]: e.target.checked,
                                            },
                                        })
                                    }
                                />
                            ))}
                        </Form.Group>
                    </div>
                    <div className={styles.form_groups}>
                        {/* Образование */}
                        <Form.Group className={styles.checkbox}>
                            <Form.Label className={styles.from_label}>Образование</Form.Label>
                            {[
                                ['no', 'Не требуется или не указано'],
                                ['average', 'Среднее профессиональное'],
                                ['higher', 'Высшее'],
                            ].map(([key, label]) => (
                                <Form.Check
                                    className={styles.from_text}
                                    key={key}
                                    inline
                                    label={label}
                                    type="radio"
                                    name="education"
                                    checked={formData.education === key}
                                    onChange={() => setFormData({ ...formData, education: key })}
                                />
                            ))}
                        </Form.Group>
                        {/* Формат работы */}
                        <Form.Group className={styles.checkbox}>
                            <Form.Label className={styles.from_label}>Формат работы</Form.Label>
                            {[
                                ['onSite', 'На месте работодателя'],
                                ['remotely', 'Удалённо'],
                                ['hybrid', 'Гибрид'],
                                ['journey', 'Разъездной'],
                            ].map(([key, label]) => (
                                <Form.Check
                                    className={styles.from_text}
                                    key={key}
                                    type="checkbox"
                                    label={label}
                                    checked={formData.workFormat[key as keyof typeof formData.workFormat]}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            workFormat: {
                                                ...formData.workFormat,
                                                [key]: e.target.checked,
                                            },
                                        })
                                    }
                                />
                            ))}
                        </Form.Group>
                        {/* Наличие машины */}
                        <Form.Group className={styles.from_label}>
                            <Form.Check
                                className={styles.from_text}
                                type="switch"
                                id="custom-switch"
                                label="Наличие машины"
                                checked={formData.car}
                                onChange={(e) => setFormData({ ...formData, car: e.target.checked })}
                            />
                        </Form.Group>
                        {/* Права категории */}
                        <Form.Group className={styles.license}>
                            <Form.Label className={styles.from_label}>Права категории</Form.Label>
                            <div className={styles.category_block}>
                                {[
                                    ['A', 'A'],
                                    ['B', 'B'],
                                    ['C', 'C'],
                                    ['D', 'D'],
                                    ['E', 'E'],
                                    ['BE', 'BE'],
                                    ['CE', 'CE'],
                                    ['DE', 'DE'],
                                    ['Tm', 'Tm'],
                                    ['Tb', 'Tb'],
                                ].map(([key, label]) => (
                                    <Form.Check
                                        className={styles.from_text}
                                        key={key}
                                        type="checkbox"
                                        label={label}
                                        checked={formData.license[key as keyof typeof formData.license]}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                license: {
                                                    ...formData.license,
                                                    [key]: e.target.checked,
                                                },
                                            })
                                        }
                                    />
                                ))}
                            </div>
                        </Form.Group>
                    </div>
                </div>
                <Button type='submit' variant="success" className={styles.button}>
                    Найти
                </Button>
            </Form >

        </div >
    );
};