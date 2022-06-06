export default class Api {
  constructor(options) {
      this.url = options.url;
      this.headers = options.headers;
  }

  _handleResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
      return fetch(`${this.url}/users/me`, {
          headers: this.headers
        })
          .then(this._handleResponse)
  }

  patchUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(this._handleResponse)
  }

  patchUserAvatar(avatar) {
    
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatar)
    })
    .then(this._handleResponse)
  }

  getCards() {
      return fetch(`${this.url}/cards`, {
        headers: this.headers
      })
        .then(this._handleResponse)
  }

  postNewCard(data) {
      return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      })
      .then(this._handleResponse)
  }

  deleteCard(data, id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(this._handleResponse)
  }

  putLike(data, id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(this._handleResponse)
  }

  deleteLike(data, id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(this._handleResponse)
  }
}