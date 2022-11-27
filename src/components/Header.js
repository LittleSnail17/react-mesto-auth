import React from "react";
import headerLogo from "../images/logo.svg";

import { Route, Link, Switch } from "react-router-dom";

function Header({ email, onExit }) {
  return (
    <header className="header">
      <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип МестоРоссия"
        />
      <div className="header__container">
        <Switch>
          <Route exact path="/">
            <p className="header__email">{email}</p>
            <Link to="/sign-in" className="header__log-out" onClick={onExit}>
              Выйти
            </Link>
          </Route>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;