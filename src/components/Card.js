import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { React, useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = `element__delete ${
    isOwn && "element__delete_active"
  }`;
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element" key={card}>
      <img
        className="element__photo"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__button-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <span className="element__counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
