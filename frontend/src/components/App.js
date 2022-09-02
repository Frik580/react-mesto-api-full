import { useState, useEffect } from "react";
import api from "../utils/Api";
// import Api from "../utils/Api";

import * as auth from "../utils/Auth";
// import * as api from "../utils/Apii";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AuthForm from "./AuthForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitPopup from "./SubmitPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isPostCardError, setIsPostCardError] = useState(false);
  const [isEditAvatarError, setIsEditAvatarError] = useState(false);
  const [isEditProfileError, setIsEditProfileError] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [userEmail, SetUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(
  //   Boolean(localStorage.getItem("jwt"))
  // );
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();


  // const api = new Api({
  //   baseUrl: "http://localhost:3001",
  //   headers: {
  //     authorization: `Bearer ${jwt}`,
  //     "Content-Type": "application/json",
  //   },
  // });

  //   console.log(`Это JWT3 ${jwt}`);

  // API даннах

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(`Это JWT!!! ${jwt}`);
    jwt && handleAuth(jwt);
    if (loggedIn) {
      const promises = [api.getUserInfo(jwt), api.getCardList(jwt)];
      Promise.all(promises)
        .then((results) => {
          setCurrentUser(results[0]);
          setCards(results[1]);
          navigate("/");
          // console.log(results[0]);
        })
        .catch((err) => {
          console.log(err);
        });

        // navigate("/");
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/");
  //   }
  //   const jwt = localStorage.getItem("jwt");
  //   jwt && handleAuth(jwt);
  // }, [loggedIn]);

  const onLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  // API фронтенд-аутентификации
  const handleAuth = async (jwt) => {
    const content = await auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          // console.log(res);
          setLoggedIn(true);
          SetUserEmail(res.email);
        } else setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return content;
  };

  const onRegister = ({ email, password }) => {
    setIsRegister(true);
    auth
      .register(email, password)
      .then((res) => {
        setIsInfoTooltip(true);
        navigate("/sign-in");
        return res;
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsRegister(false);
        console.log(err);
      });
  };

  const onLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        console.log(`Это токен ${res.token}`);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          const jwt = localStorage.getItem("jwt");
          api.getJwt(jwt);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageError("Что-то пошло не так. Проверьте email и пароль.");
      })
      .finally(() => {
        setTimeout(() => {
          setMessageError("");
        }, 4000);
      });
  };

  function reloadCards() {
    api
      .getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        setIsEditProfileError(true);
        setTimeout(() => {
          setIsEditProfileError(false);
        }, 3000);
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        setIsEditAvatarError(true);
        setTimeout(() => {
          setIsEditAvatarError(false);
        }, 3000);
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        reloadCards();
        closeAllPopups();
      })
      .catch((err) => {
        setIsPostCardError(true);
        setTimeout(() => {
          setIsPostCardError(false);
        }, 3000);
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const id = card._id;
    api
      .deleteCard(card)
      .then(() => {
        const newCards = cards.filter(function (card) {
          return card._id !== id;
        });
        setCards(newCards);
        reloadCards();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setSelectedCard({});
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSubmitPopupOpen(false);
    setIsInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header email={userEmail} onLogout={onLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Main
                    onEditProfile={() => setIsEditProfilePopupOpen(true)}
                    onAddPlace={() => setIsAddPlacePopupOpen(true)}
                    onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                    onCardClick={(data) => setSelectedCard(data)}
                    onCardDelete={(data) => {
                      setIsSubmitPopupOpen(true);
                      setDeletedCard(data);
                    }}
                    onCardLike={handleCardLike}
                    cards={cards}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          {!loggedIn && (
            <>
              <Route
                path="sign-up"
                element={
                  <AuthForm onRegister={onRegister} authForm="register" />
                }
              />
              <Route
                path="sign-in"
                element={
                  <AuthForm
                    onLogin={onLogin}
                    messageError={messageError}
                    authForm="login"
                  />
                }
              />
            </>
          )}

          <Route // роут для gh-pages
            path="react-mesto-auth"
            element={<Navigate to="/sign-in" replace />}
          />

          <Route
            path="*"
            element={
              <div style={{ textAlign: "center" }}>
                <p>Здесь ничего нет: 404!</p>
                <Link to="/" className="link hover" style={{ fontSize: 14 }}>
                  На главную страницу
                </Link>
              </div>
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isEditProfileError={isEditProfileError}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isEditAvatarError={isEditAvatarError}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPostCardError={isPostCardError}
        />

        <SubmitPopup
          card={deletedCard}
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isRegister={isRegister}
        />

        <ImagePopup сard={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
