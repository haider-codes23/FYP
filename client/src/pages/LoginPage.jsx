import { useState } from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useContext } from 'react';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const {data} = await axios.post('/login', {email, password});
      setUser(data);
      alert('Login Successful');
      setRedirect(true);
    } catch (exception) {
      alert('Login Failed, try again');
      console.log(exception)
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email" placeholder="youremail@email.com" value={email} onChange={event => {setEmail(event.target.value);}} />
          <input type="password" placeholder="password" value={password} onChange={event => {setPassword(event.target.value);}} />
          <button className="btn-secondary">Login</button>
          <div className='text-center text-gray-600 py-2'>
            Dont have an account yet ?
            <Link className='underline text-black' to={'/register'}>Sign Up</Link>
          </div>
        </form>

      </div>
    </div>
  );
}

export default LoginPage;