class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = options.token;
    this._content_type = 'application/json';
    this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}/${link}`, {
      method: method,
      headers: {
        authorization: `Bearer ${this._token}`,
        'content-type': this._content_type
      },
      body: JSON.stringify(body)
    })
      .then(res => {
          if (res.ok) {
            return res.json();

          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      )
      .then((result) => {
        return result;
      });
  }

  getToken(token) {
    this._token = token;
  }

  getInitialCards() {
    return this._fetch('cards');
  }

  getProfileInfo() {
    return this._fetch('users/me');
  }

  setProfileInfo(body) {
    return this._fetch('users/me', 'PATCH', body);
  }

  setProfileAvatar({ avatar }) {
    return this._fetch('users/me/avatar', 'PATCH', { avatar });
  }

  setNewCard(body) {
    return this._fetch('cards', 'POST', body);
  }

  deleteCard(id) {
    return this._fetch(`cards/${id}`, 'DELETE');
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._fetch(`cards/${id}/likes/`, 'PUT')
    } else {
      return this._fetch(`cards/${id}/likes/`, 'DELETE');
    }
  }
}

export const api = new Api({
  // baseUrl: 'http://localhost:3000',

  baseUrl: 'https://api.mestoapp.kirmoro.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  },
  token: '',
});
