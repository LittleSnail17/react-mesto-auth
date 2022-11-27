import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function PopupWithAvatar(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__corection">
        <input
          ref={avatarRef}
          type="url"
          id="avatar"
          placeholder="Ссылка на фото профиля"
          name="avatar"
          className="popup__input popup__input-avatar popup__input_type_avatar"
          required
        />
        <span className="popup__input-form-error popup__input-avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default PopupWithAvatar;
