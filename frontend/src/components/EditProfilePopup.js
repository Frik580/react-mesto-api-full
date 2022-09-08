import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isEditProfileError,
}) {
  const currentUser = useContext(CurrentUserContext);
  // const [state, setState] = useState("");
  const [buttonValue, setButtonValue] = useState("");
  const inputRef = useRef();
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
    setButtonValue("Сохранить");
    inputRef.current.focus();
  }, [currentUser, isOpen, setValues]);

  useEffect(() => {
    setTimeout(() => {
      setValues({ name: currentUser.name, about: currentUser.about });
    }, 2000);
    setButtonValue("Сохранить");
  }, [currentUser.about, currentUser.name, isEditProfileError, setValues]);

  // const handleInputChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonValue("Сохранение...");
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
    resetForm();
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
      isValid={isValid}
    >
      <fieldset className="form__conteiner">
        <input
          type="text"
          ref={inputRef}
          value={values.name ?? ""}
          onChange={handleChange}
          name="name"
          className="form__item"
          minLength="2"
          maxLength="30"
          placeholder="Введите имя"
          required
        />
        <span id="user-name-error" className="error">
          {errors.name && <p>{errors.name ?? "Error!!!"}</p>}
        </span>
      </fieldset>
      <fieldset className="form__conteiner">
        <input
          type="text"
          value={values.about ?? ""}
          onChange={handleChange}
          name="about"
          className="form__item"
          minLength="2"
          maxLength="30"
          placeholder="О себе"
          required
        />
        <span id="about-error" className="error">
          {errors.about && <p>{errors.about ?? "Error!!!"}</p>}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default React.memo(EditProfilePopup);
