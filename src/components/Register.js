import { React, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Register (props){
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
    props.onRegister({ email, password})
  }

    return (
        <>
         <div className="sign-in">
        <h2 className="sign-in__title">Регистрация</h2>
        <form  onSubmit={handleSubmit}  className="sign-in__form">
            <input className="sign-in__input"
                         required
                         id='email'
                         name='email'
                         type='email'
                         placeholder='Email'
                         onChange={handleEmailInput}
            value={email}
                         />
            <input className="sign-in__input"
            required
            id='password'
            name='password'
            minLength='5'
            maxLength='20'
            type='password'
            placeholder='Пароль'
            onChange={handlePasswordInput}
            value={password}
            />
            <button className="sign-in__button" type='submit' >Зарегистрироваться</button>
        </form>
        <Link to="/sign-in" className="sign-in__description"> Уже зарегистрированы?Войти </Link> 
        </div>
        </>
    )
}