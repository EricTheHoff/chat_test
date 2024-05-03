import { useContext } from 'react';
import { UserContext } from './UserContext';
import RegisterAndLoginForm from "./RegisterAndLoginForm";

const Routes = () => {
  const { loggedInUsername, id } = useContext(UserContext);
  // console.log(loggedInUsername);
  
  if (loggedInUsername) { 
    return `Logged in as ${loggedInUsername}`
  }

  return (
    <RegisterAndLoginForm />
  )
}

export default Routes