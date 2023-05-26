import { Routes, Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPage from './pages/PlacesPage.jsx';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingPage from './pages/Booking';
import BookingsPage from './pages/Bookings';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path={'/login'} element={<LoginPage />}></Route>
          <Route path={'/register'} element={<RegisterPage />}></Route>
          <Route path={'/account'} element={<ProfilePage/>}></Route>
          <Route path={'/account/places'} element={<PlacesPage/>}></Route>
          <Route path={'/account/places/new'} element={<PlacesFormPage/>}></Route>
          <Route path={'/account/places/:id'} element={<PlacesFormPage/>}></Route>
          <Route path={'/place/:id'} element={<PlacePage/>}></Route>
          <Route path={'/account/bookings'} element={<BookingsPage/>}></Route>
          <Route path={'/account/bookings/:id'} element={<BookingPage/>}></Route>
          
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
