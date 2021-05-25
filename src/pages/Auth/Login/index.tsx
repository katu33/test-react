import React, { FormEvent, useRef } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AuthService from '../../../common/services/auth';

const LoginPage = () => {
  const history = useHistory();

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const usernameVal = username?.current?.value;
    const passwordVal = password?.current?.value;

    if (!usernameVal || !passwordVal) return;

    AuthService.login({
      username: usernameVal,
      password: passwordVal
    }).then(res => {
      localStorage.setItem('user', JSON.stringify(res));
      history.push('/');
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <h4>Hello! let's get started</h4>
      <h6 className='font-weight-light'>Sign in to continue.</h6>
      <form className='pt-3' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control form-control-lg'
            id='exampleInputEmail1'
            placeholder='Username'
            defaultValue='admin'
            ref={username}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control form-control-lg'
            id='exampleInputPassword1'
            placeholder='Password'
            defaultValue='admin'
            ref={password}
          />
        </div>
        <div className='mt-3'>
          <button type='submit' className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'>
            SIGN IN
          </button>
        </div>
        <div className='my-2 d-flex justify-content-between align-items-center'>
          <div className='form-check'>
            <label className='form-check-label text-muted'>
              <input type='checkbox' className='form-check-input' />
              Keep me signed in
            </label>
          </div>
          {/* <a href='#' className='auth-link text-black'>
            Forgot password?
          </a> */}
        </div>
        <div className='mb-2'>
          <button
            type='button'
            className='btn btn-block btn-facebook auth-form-btn'
          >
            <i className='ti-facebook mr-2'></i>Connect using facebook
          </button>
        </div>
        <div className='text-center mt-4 font-weight-light'>
          Don't have an account?{' '}
          <Link to='/auth/register' className='text-primary'>Create</Link>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
