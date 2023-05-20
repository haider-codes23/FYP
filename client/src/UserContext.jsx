import {createContext, useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({data}) => {
        setUser(data);
      });
      
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}