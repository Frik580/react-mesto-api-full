import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect, useState } from "react";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isEditAvatarError,
}) {
  const [buttonValue, setButtonValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.value = "";
    setButtonValue("Сохранить");
  }, [isOpen]);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.value = "";
    }, 2000);
    setButtonValue("Сохранить");
  }, [isEditAvatarError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonValue("Сохранение...");
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      buttonValue={isEditAvatarError ? "Ошибка в загрузке данных" : buttonValue}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      conteinerSize="popup__conteiner_size_medium"
      isValid={true}
    >
      <fieldset className="form__conteiner">
        <input
          type="url"
          ref={inputRef}
          name="avatar"
          className="form__item"
          minLength="2"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="avatar-error" className="error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default React.memo(EditAvatarPopup);
