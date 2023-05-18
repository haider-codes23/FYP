import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('/login', {email, password});
      alert('Login Successful');
    } catch (exception) {
      alert('Login Failed, try again');
      console.log(exception)
    }
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