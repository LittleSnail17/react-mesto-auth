class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }
  register(email, password) {
    return fetch(`${this._url}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      return this._getResponse(res);
    });
  }
  getData(jwt) {
    const headers = this._headers;
    headers["Authorization"] = `Bearer ${jwt}`;
    return fetch(`${this._url}/users/me`, {
      headers: headers,
    }).then((res) => {
      return this._getResponse(res);
    });
  }
}
const auth = new Auth({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
