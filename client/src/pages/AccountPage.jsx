import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function AccountPage() {
  const {ready ,user, setUser} = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let {subpage} = useParams()
  console.log(subpage);
  if (subpage === undefined) {
    subpage = 'profile';
  }

  // Logout Function
  async function logOut() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  // if the user is not ready it will return loading
  if (!ready) {
    return "Loading...";
  }

  // if the user is ready and we dont have the user it will direct us to the LoginPage
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }


  function linkClasses(type = null) {
    let classes = 'py-2 px-6';
    if (type === subpage) {
      classes += ' bg-secondary text-white rounded-full';
    } 
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
        <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>My places</Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logOut} className="btn-logout">Log Out</button>
        </div>)}
    </div>
  );
}

export default AccountPage;