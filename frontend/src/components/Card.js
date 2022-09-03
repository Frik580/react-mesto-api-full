import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  // console.log(card);
  // console.log(currentUser);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  return (
    <li className="element">
      <img
        onClick={() => onCardClick(card)}
        src={card.link}
        className="element__pic"
        alt={card.name}
      />
      <button
        onClick={() => onCardDelete(card)}
        className={`element__del-button hover element__del-button_${
          isOwn ? "visible" : "hidden"
        }`}
        type="button"
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            onClick={() => onCardLike(card)}
            className={`hover element__like-button${isLiked ? "_active" : ""}`}
            type="button"
          />
          <p className="element__like-value">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default React.memo(Card);
