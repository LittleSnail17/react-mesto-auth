import React from "react";
import success from "../images/Success.svg";
import error from "../images/Error.svg";

function InfoToolTip({ isOpen, onClose, isReg, successText, errorText }) {

  return (
    <div
      className={isOpen ? "popup popup_opened" : "popup"}
    >
      <div className="popup__container popup__container-message">
        <button
          className="popup__close-button popup__close-button_message-info"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__info-icon"
          src={isReg ? success : error }
          alt={isReg ? "Успешно" : "Ошибка"}
        />
        <p className="popup__info-text">{isReg ? successText: errorText}</p>
      </div>
    </div>
  );
}

export default InfoToolTip;