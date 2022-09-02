import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function AuthForm({ messageError, onRegister, onLogin, authForm }) {
  const [state, setState] = useState("");
  const inputRef = useRef();
  const isValid = true;
  const inputStyle = {
    color: "#fff",
    borderBottomColor: "#ccc",
  };

  useEffect(() => {
    setState({ email: "", password: "" });
    inputRef.current.focus();
  }, [authForm]);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authForm === "register" &&
      onRegister({ email: state.email, password: state.password });
    authForm === "login" &&
      onLogin({ email: state.email, password: state.password });
  };

  return (
    <div className="conteiner">
      <form onSubmit={handleSubmit} className="form">
        <h3 className="form__title">
          {authForm === "register" && "Регистрация"}
          {authForm === "login" && "Вход"}
        </h3>
        {messageError}
        <fieldset className="form__conteiner">
          <input
            type="email"
            ref={inputRef}
            value={state.email ?? ""}
            onChange={handleInputChange}
            name="email"
            className="form__item"
            style={inputStyle}
            placeholder="Email"
            required
          />
          <span id="user-name-error" className="error" />
        </fieldset>
        <fieldset className="form__conteiner">
          <input
            type="password"
            value={state.password ?? ""}
            onChange={handleInputChange}
            name="password"
            className="form__item"
            style={inputStyle}
            placeholder="Пароль"
            required
          />
          <span id="about-error" className="error" />
        </fieldset>

        <button
          disabled={!isValid}
          className={`form__button_dark ${!isValid && "form__button_disabled"}`}
          type="submit"
          name="button"
        >
          {authForm === "register" && "Зарегистрироваться"}
          {authForm === "login" && "Войти"}
        </button>
        {authForm === "register" && (
          <div className="form__text">
            {`Уже зарегистрированы? `}
            <Link to="/sign-in" className="link hover" style={{ fontSize: 14 }}>
              Войти
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default React.memo(AuthForm);
