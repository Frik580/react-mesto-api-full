import PopupWithForm from "./PopupWithForm";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isPostCardError }) {
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

  const { ref, ...rest } = register("namecard", {
    required: "Поле обязательно к заполнению",
    minLength: {
      value: 2,
      message: "Минимум 2 символа",
    },
    maxLength: {
      value: 30,
      message: "Максимум 30 символов",
    },
  });

  useEffect(() => {
    setButtonValue("Создать");
    reset();
    inputRef.current.focus();
  }, [isOpen, reset]);

  useEffect(() => {
    setTimeout(() => {
      reset();
    }, 2000);
    setButtonValue("Создать");
  }, [isPostCardError, reset]);

  const onHandle = (data) => {
    onAddPlace({
      name: data.namecard,
      link: data.url,
    });
    setButtonValue("Сохранение...");
  };

  return (
    <PopupWithForm
      title="Новое место"
      buttonValue={isPostCardError ? "Ошибка в загрузке данных" : buttonValue}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onHandle)}
      isValid={isValid}
    >
      <fieldset className="form__conteiner">
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          type="text"
          className={`form__item ${
            errors?.namecard && "form__item_type_error"
          }`}
          placeholder="Название"
        />
        <span id="name-card-error" className="error">
          {errors?.namecard && <p>{errors?.namecard?.message ?? "Error!!!"}</p>}
        </span>
      </fieldset>
      <fieldset className="form__conteiner">
        <input
          {...register("url", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 2,
              message: "Минимум 2 символа",
            },
          })}
          type="url"
          className={`form__item ${errors?.url && "form__item_type_error"}`}
          placeholder="Ссылка на картинку"
        />
        <span id="link-error" className="error">
          {errors?.url && <p>{errors?.url?.message ?? "Error!!!"}</p>}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default React.memo(AddPlacePopup);
