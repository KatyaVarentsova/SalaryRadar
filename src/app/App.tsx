import 'normalize.css';
import { MainPage, FilterPage, ResultsPage } from '../pages';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/filter' element={<FilterPage/>} />
        <Route path='/results' element={<ResultsPage/>} />
        {/* <Route path='/test' element={<TestPage/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
