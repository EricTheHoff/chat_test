import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register')
  const {setLoggedInUsername, setId} = useContext(UserContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = isLoginOrRegister === 'register' ? '/register' : '/login';
    try {
      const response = await axios.post(url, {username: username, password: password});
      setLoggedInUsername(username);
      setId(response.data._id);
    } catch (error) {
      alert('An error has occurred!');
    }
  };

  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='flex flex-col w-64 mx-auto mb-12' onSubmit={handleSubmit}>
        <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='username' className='rounded-sm p-2 mb-2 border'/>
        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' className='rounded-sm p-2 mb-2 border'/>
        <button type='submit' className='bg-blue-500 text-white w-full rounded-sm p-2'>{isLoginOrRegister === 'register' ? 'Register' : 'Login'}</button>
        <div className='text-center mt-2'>
          {isLoginOrRegister === 'register' && (
            <div>
              Already have an account? <button onClick={() => setIsLoginOrRegister('login')}>Login here</button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              Don't have an account? <button onClick={() => setIsLoginOrRegister('register')}>Register here</button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default RegisterAndLoginForm