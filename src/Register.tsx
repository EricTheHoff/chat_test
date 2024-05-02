import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setLoggedInUsername, setId} = useContext(UserContext);

  const register = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {username: username, password: password});
      setLoggedInUsername(username);
      setId(response.data._id);
    } catch (error) {
      alert('An error has occurred!');
    }
  };

  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='flex flex-col w-64 mx-auto mb-12' onSubmit={register}>
        <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='username' className='rounded-sm p-2 mb-2 border'/>
        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' className='rounded-sm p-2 mb-2 border'/>
        <button type='submit' className='bg-blue-500 text-white w-full rounded-sm p-2'>Register</button>
      </form>
    </div>
  )
}

export default Register