const jwt = localStorage.getItem("jwt");

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  };

  getJwt = (jwt) => {
    this._headers = {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    }
  }

  getCardList = () => {
    return fetch(`${this._url}/cards`, { headers: this._headers }).then(
      this._handleResponse
    );
  };

  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, { headers: this._headers }).then(
      this._handleResponse
    );
  };

  setUserInfo = (data) => {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  };

  postCard = (data) => {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  };

  deleteCard = (data) => {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  };

  changeLikeCardStatus = (data, isLiked) => {
    if (isLiked) {
      return fetch(`${this._url}/cards/${data._id}/likes`, {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._handleResponse);
    } else {
      return fetch(`${this._url}/cards/${data._id}/likes`, {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._handleResponse);
    }
  };

  setUserAvatar = (data) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  };
}

const api = new Api({
  baseUrl: "https://metric.students.nomorepartiesxyz.ru/api",
  headers: {
    authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});

export default api;
