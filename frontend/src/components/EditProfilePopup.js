import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isEditProfileError,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [state, setState] = useState("");
  const [buttonValue, setButtonValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setState({ name: currentUser.name, about: currentUser.about });
    setButtonValue("Сохранить");
    inputRef.current.focus();
  }, [currentUser, isOpen]);

  useEffect(() => {
    setTimeout(() => {
      setState({ name: currentUser.name, about: currentUser.about });
    }, 2000);
    setButtonValue("Сохранить");
  }, [currentUser.about, currentUser.name, isEditProfileError]);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonValue("Сохранение...");
    onUpdateUser({
      name: state.name,
      about: state.about,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      buttonValue={
        isEditProfileError ? "Ошибка в загрузке данных" : buttonValue
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    >
      <fieldset className="form__conteiner">
        <input
          type="text"
          ref={inputRef}
          value={state.name ?? ""}
          onChange={handleInputChange}
          name="name"
          className="form__item"
          minLength="2"
          maxLength="40"
          placeholder="Введите имя"
          required
        />
        <span id="user-name-error" className="error" />
      </fieldset>
      <fieldset className="form__conteiner">
        <input
          type="text"
          value={state.about ?? ""}
          onChange={handleInputChange}
          // id="about"
          name="about"
          className="form__item"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          required
        />
        <span id="about-error" className="error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default React.memo(EditProfilePopup);
