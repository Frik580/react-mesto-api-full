import React, { useEffect } from "react";

function PopupWithForm({
  title,
  buttonValue,
  isOpen,
  onClose,
  conteinerSize,
  children,
  onSubmit,
  isValid,
  isFocus,
}) {
  useEffect(() => {
    const handleEscClose = (e) => {
      e.key === "Escape" && onClose();
    }
    document.addEventListener("keyup", handleEscClose);
    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, [onClose, isOpen]);

  return (
    <div
      onClick={onClose}
      className={`popup ${isOpen && "popup_opened"}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`popup__conteiner ${conteinerSize}`}
      >
        <button
          onClick={onClose}
          className="popup__close-button hover"
          type="button"
        />
        <form
          onSubmit={onSubmit}
          className="form"
          noValidate
        >
          <h3 className="form__title">{title}</h3>
          {children}

          <button
            ref={isFocus && ((button) => button && button.focus())}
            disabled={!isValid}
            className={`form__button ${
              !isValid && "form__button_disabled"
            }`}
            type="submit"
            name="button"
          >
            {buttonValue}
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(PopupWithForm);
