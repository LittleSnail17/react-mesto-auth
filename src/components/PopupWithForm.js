function PopupWithForm(props) {
  return (
    <section
      className={`${props.isOpen ? "popup_opened" : ""} popup popup_type_${
        props.name
      }-info `}
    >
      <div className={`popup__container popup__container-${props.name}`}>
        <button
          onClick={props.onClose}
          className={`popup__close-button popup__close-button_${props.name}-info`}
          type="button"
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__${props.name}-form`}
          name="popup-form"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`popup__submit popup__submit_${props.name}`}
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
