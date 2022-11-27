import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function PopupWithPlace(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <div className="popup__corection">
        <input
          type="text"
          id="popup__input-info"
          placeholder="Название"
          name="name"
          className="popup__input popup__input_type_info"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
        <span className="popup__input-form-error popup__input-info-error"></span>
      </div>
      <div className="popup__corection">
        <input
          type="url"
          id="popup__input-link"
          placeholder="Ссылка на картинку"
          name="link"
          className="popup__input popup__input_type_image"
          onChange={handleLinkChange}
          required
          value={link}
        />
        <span className="popup__input-form-error popup__input-link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default PopupWithPlace;
