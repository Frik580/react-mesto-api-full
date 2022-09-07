import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isEditAvatarError,
}) {
  const [buttonValue, setButtonValue] = useState("");
  const inputRef = useRef();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
  });

  const { ref, ...rest } = register("avatar", {
    required: "Поле обязательно к заполнению",
    pattern: {
      value: /https?:\/\/(w{3}\.)?([\w-]{1,}\.)+[\w._~:/?#[\]@!$&'()*+,;=]*#?/i,
      message: `Введите ссылку вида "http://example.net/picture.jpeg"`,
    },
    minLength: {
      value: 2,
      message: "Минимум 2 символа",
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    reset();
    setButtonValue("Сохранить");
  }, [isOpen, reset]);

  useEffect(() => {
    setTimeout(() => {
      reset();
    }, 2000);
    setButtonValue("Сохранить");
  }, [isEditAvatarError, reset]);

  const onHandle = () => {
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
      onSubmit={handleSubmit(onHandle)}
      conteinerSize="popup__conteiner_size_medium"
      isValid={isValid}
    >
      <fieldset className="form__conteiner">
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          type="url"
          className={`form__item ${
            errors?.namecard && "form__item_type_error"
          }`}
          placeholder="Ссылка на картинку"
        />
        <span id="avatar-error" className="error">
          {errors?.avatar && <p>{errors?.avatar?.message ?? "Error!!!"}</p>}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default React.memo(EditAvatarPopup);
