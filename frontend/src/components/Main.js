import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        {currentUser.avatar && (
          <div className="profile__avatar-box">
            <img
              onClick={onEditAvatar}
              src={currentUser.avatar}
              className="profile__avatar"
              alt="Фотография в профайле"
            />
            <div className="profile__avatar-ikon" />
          </div>
        )}
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__text">{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            className="profile__edit-button hover"
            type="button"
          />
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button hover"
          type="button"
        />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default React.memo(Main);
