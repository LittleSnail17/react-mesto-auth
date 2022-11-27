import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function PopupWithProfile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <div className="popup__corection">
        <input
          type="text"
          id="popup__input-name"
          placeholder="Имя"
          name="name"
          className="popup__input popup__input_type_name"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name}
        />
        <span className="popup__input-form-error popup__input-name-error"></span>
      </div>
      <div className="popup__corection">
        <input
          type="text"
          id="popup__input-job"
          placeholder="О себе"
          name="about"
          className="popup__input popup__input_type_job"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-form-error popup__input-job-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default PopupWithProfile;
