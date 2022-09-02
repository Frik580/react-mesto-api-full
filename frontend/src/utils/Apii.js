import React, { useContext } from "react";

function Api() {
  const BASE_URL = "http://localhost:3001";
  const jwt = localStorage.getItem("jwt");
  console.log(`Это JWT22 ${jwt}`);
  const headers = {
    authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };

  const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  };

  const getCardList = () => {
    return fetch(`${BASE_URL}/cards`, {
      headers: headers,
    }).then(handleResponse);
  };

  const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, { headers: headers }).then(
      handleResponse
    );
  };

  const setUserInfo = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    }).then(handleResponse);
  };

  const postCard = (data) => {
    return fetch(`${BASE_URL}/cards`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    }).then(handleResponse);
  };

  const deleteCard = (data) => {
    return fetch(`${BASE_URL}/cards/${data._id}`, {
      method: "DELETE",
      headers: headers,
    }).then(handleResponse);
  };

  const changeLikeCardStatus = (data, isLiked) => {
    if (isLiked) {
      return fetch(`${BASE_URL}/cards/${data._id}/likes`, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data),
      }).then(handleResponse);
    } else {
      return fetch(`${BASE_URL}/cards/${data._id}/likes`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      }).then(handleResponse);
    }
  };

  const setUserAvatar = (data) => {
    return fetch(`${BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    }).then(handleResponse);
  };
}

export default React.memo(Api);
