export default class UserInfo {
  constructor({ username, job, avatar}) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      job: this._job.textContent,
    }

    return userInfo;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, profession }) {
    this._username.textContent = name;
    this._job.textContent = profession;
  }

  setAvatar(url) {
    this._avatar.style.backgroundImage = `url(${url})`;
  }

  saveUserId(userId) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }
  
}