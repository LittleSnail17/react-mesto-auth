import { React, useState } from 'react';

export default function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
      }
      function handlePasswordInput(evt) {
        setPassword(evt.target.value);
      }

      function handleSubmit(evt) {
        evt.preventDefault();
        props.onLogin({ email, password});
      }
    

    return(
        <>
        <div className="sign-in">
        <h2 className="sign-in__title">Вход</h2>
        <form onSubmit={handleSubmit} className="sign-in__form">
            <input className="sign-in__input"
                         required
                         id='email'
                         name='email'
                         type='email'
                         placeholder='Email'
                         value={email}
                         onChange={handleEmailInput}/>
            <input className="sign-in__input"
            required
            id='password'
            name='password'
            minLength='5'
            maxLength='20'
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={handlePasswordInput}
            />
            <button className="sign-in__button" type='submit' >Войти</button>
        </form>
        </div>
        </>
    )
}