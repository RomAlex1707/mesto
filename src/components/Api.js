export default class Api {
    constructor(apiPath, token) {
      this._apiPath = apiPath;
      this._token = token;
      this.userId = null;
    }
  
    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }
  
    getUserInfo() {
      return fetch(`${this._apiPath}/users/me`, {
        headers: {
          authorization: this._token,
        },
      })
      .then((res) => this._getResponseData(res))
      .then((data) => {
        this.userId = data._id;
        return data;
      });
    }
  
    getCards() {
      return fetch(`${this._apiPath}/cards`, {
        headers: {
          authorization: this._token,
        },
      }).then((res) => this._getResponseData(res));
    }
  
    editProfile(data) {
      return fetch(`${this._apiPath}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          about: data.profession,
        }),
      }).then((res) => this._getResponseData(res));
    }
  
    editAvatar(data) {
      return fetch(`${this._apiPath}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: data.link,
        }),
      }).then((res) => this._getResponseData(res));
    }
  
    addCard(data) {
      return fetch(`${this._apiPath}/cards`, {
        method: "POST",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then((res) => this._getResponseData(res));
    }
  
    deleteCard(cardId) {
      return fetch(`${this._apiPath}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }).then((res) => this._getResponseData(res));
    }
  
    addLike(cardId) {
      return fetch(`${this._apiPath}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: this._token,
        },
      }).then((res) => this._getResponseData(res));
    }
  
    deleteLike(cardId) {
      return fetch(`${this._apiPath}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }).then((res) => this._getResponseData(res));
    }
  }