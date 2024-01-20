import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

import { register, reset } from '../features/auth/authSlice';
import Spinner from './Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords are different');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className='heading'>
        <h1><FaUser /> Register</h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              id='name'
              type='text'
              name='name'
              value={name}
              onChange={handleChange}
              className='form-control'
              placeholder='Enter your name'
            />
          </div>
          <div className='form-group'>
            <input
              id='email'
              type='text'
              name='email'
              value={email}
              onChange={handleChange}
              className='form-control'
              placeholder='Enter your email'
            />
          </div>
          <div className='form-group'>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              className='form-control'
              placeholder='Enter password'
            />
          </div>
          <div className='form-group'>
            <input
              id='password2'
              type='password'
              name='password2'
              value={password2}
              onChange={handleChange}
              className='form-control'
              placeholder='Confirm password'
            />
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register