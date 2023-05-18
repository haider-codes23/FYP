import axios from 'axios';
import { useState } from "react";
import { Link } from "react-router-dom";


function RegisterPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event) {
    event.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Sign Up Successful, Now you can Login');

    } catch (exception) {
        alert('Sign Up Failed Email already in use')
      }
    }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32 ">
        <h1 className="text-4xl text-center mb-4">Sign Up</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type='text' placeholder='Name'onChange={event => setName(event.target.value)} value={name} />
          <input type="email" placeholder="youremail@email.com" value={email} onChange={event => setEmail(event.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={event => {setPassword(event.target.value);console.log(event.target.value)}} />
          <button className="btn-secondary">Sign Up</button>
          <div className='text-center text-gray-600 py-2'>
            Already a member ?
            <Link className='underline text-black' to={'/login'}>Log In</Link>
          </div>
        </form>

      </div>
    </div>
  );
}

export default RegisterPage;