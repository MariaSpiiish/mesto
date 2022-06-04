const handleResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export default class Api {
  constructor(options) {
      this.url = options.url;
      this.headers = options.headers;
  }

  getUserInfo() {
      return fetch(`${this.url}/users/me`, {
          headers: this.headers
        })
          .then(handleResponse)
  }

  patchUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(handleResponse)
  }

  patchUserAvatar(avatar) {
    
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatar)
    })
    .then(handleResponse)
  }

  getCards() {
      return fetch(`${this.url}/cards`, {
        headers: this.headers
      })
        .then(handleResponse)
  }

  postNewCard(data) {
      return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      })
      .then(handleResponse)
  }

  deleteCard(data, id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(handleResponse)
  }

  putLike(data, id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(handleResponse)
  }

  deleteLike(data, id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(handleResponse)
  }


}