import {Link} from 'react-router-dom';
function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="youremail@email.com" />
          <input type="password" placeholder="password" />
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