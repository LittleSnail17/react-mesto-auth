import { React, useState, useEffect } from "react";
import { Route, Switch, useHistory} from 'react-router-dom';
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithProfile from "./PopupWithProfile.js";
import PopupWithPlace from "./PopupWithPlace.js";
import PopupWithAvatar from "./PopupWithAvatar.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoToolTip from "./InfoToolTip.js";
import auth from '../utils/Auth.js'



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);


  useEffect(() => {
    if (loggedIn) {
    api
      .getAllData()
      .then((data) => {
        const [userInfo, cardsList] = data;
        setCurrentUser(userInfo);
        setCards(cardsList);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((cards) =>
          cards.filter((c) => (c._id === card._id ? "" : newCard))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userObject) {
    api
      .editProfile(userObject)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .getAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardObject) {
    api
      .getNewCard(cardObject)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister ({ email, password }){
    auth.register(email, password)
      .then((data) => {
        setIsReg(true);
        setInfoPopupOpen(true);
        setEmail(data.email);
        history.push("/sign-in");
      })
      .catch((err) => {
        err.message === undefined
          ? setMessage(err.error)
          : setMessage(err.message);
        setIsReg(false);
        setInfoPopupOpen(true);
      });
  }

  function onLogin ({ email, password }){
    auth.authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          history.replace({ pathname: "/" });
        }
      })
      .catch((err) => {
        err.message === undefined
          ? setMessage(err.error)
          : setMessage(err.message);
        setIsReg(false);
        setInfoPopupOpen(true);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      auth.getData(token)
        .then((data) => {
          setLoggedIn(true)
          setEmail(data.data.email)
          history.push('/')
        })
        .catch(err => console.log(err))
    }
  }, [history])

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
        email={email} signOut={signOut}
            />
        <Switch>
        <ProtectedRoute 
        exact 
        path="/"
        loggedIn={loggedIn}
        component={Main}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
        />
          <Route path="/sign-in">
            <Login onLogin={onLogin}/>
          </Route>
          <Route path="/sign-up">
            <Register  onRegister={onRegister} />
          </Route>
        </Switch>
        <Footer />
        <InfoToolTip
          isOpen={infoPopupOpen}
          onClose={closeAllPopups}
          isReg={isReg}
          successText="Вы успешно зарегистрировались!"
          errorText="Что-то пошло не так! Попробуйте ещё раз."
          message={message}
        />
        <PopupWithProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupWithPlace
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
