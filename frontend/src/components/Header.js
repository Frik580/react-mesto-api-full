import React from "react";
import { Link, Routes, Route } from "react-router-dom";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <p className="header__logo"></p>
      <div style={{ marginLeft: "auto", display: "flex" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <p className="header__text">{email}</p>
                <p
                  onClick={onLogout}
                  className="link"
                  style={{ color: "#A9A9A9" }}
                >
                  Выйти
                </p>
              </>
            }
          />
          <Route
            path="sign-in"
            element={
              <Link to="/sign-up" className="link hover">
                Регистрация
              </Link>
            }
          />
          <Route
            path="sign-up"
            element={
              <Link to="/sign-in" className="link hover">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
      <p></p>
    </header>
  );
}

export default React.memo(Header);
