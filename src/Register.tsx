import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/register', {username: username, password: password});
    } catch (error) {
      alert(error.response.data.error);
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