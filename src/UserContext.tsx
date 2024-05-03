import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => { // When the component loads, check if there is a cookie for the profile. If there is, updated ID and username to match.
    axios.get('/profile').then((res) => {
      setId(res.data.userId);
      setLoggedInUsername(res.data.username);
    })
    .catch(() => {
      console.log('No logged in user')
    })
  },[])

  return (
    <UserContext.Provider value={{loggedInUsername, setLoggedInUsername, id, setId}}>{children}</UserContext.Provider> // 'value' refers to the context fields that the context Provider will use.
  )
}