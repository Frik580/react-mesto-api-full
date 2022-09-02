import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

function SubmitPopup({ card, isOpen, onClose, onDeleteCard }) {
  const [buttonValue, setButtonValue] = useState("");

  useEffect(() => {
    setButtonValue("Да");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonValue("Удаление...");
    onDeleteCard(card);
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      buttonValue={buttonValue}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      conteinerSize="popup__conteiner_size_small"
      isValid={true}
      isFocus={true}
    />
  );
}

export default React.memo(SubmitPopup);
