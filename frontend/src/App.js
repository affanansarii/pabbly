import './App.css';
import { Route, Routes } from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';

function App() {
  return (

    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/task/:id' element={<TaskPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

    </Routes>

  );
}

export default App;
