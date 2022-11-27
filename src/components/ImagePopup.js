function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_open-card ${card && "popup_opened"} `}>
      <div className="popup__container-image">
        <button
          className="popup__close-button popup__close-button_card"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__photo" alt={card?.name} src={card?.link} />
        <p className="popup__caption">{card?.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
