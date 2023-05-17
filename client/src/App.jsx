import { Routes, Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage';
import Layout from './Layout';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />}></Route>
        <Route path={'/login'} element={<LoginPage />}></Route>

      </Route>
    </Routes>
  );
}

export default App
