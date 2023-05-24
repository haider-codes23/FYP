import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNavigation from "../AccountNavigation";

function ProfilePage() {
  const {ready ,user, setUser} = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let {subpage} = useParams()
  
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


  if (redirect) {
    return <Navigate to={redirect} />
  }
  
  return (
    <div>
      <AccountNavigation></AccountNavigation>
      
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logOut} className="btn-logout">Log Out</button>
        </div>)}

        {subpage === 'places' && (
          <PlacesPage />
        )}

    </div>
  );
}

export default ProfilePage;