class Validation {
  validateEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }

  validatePassword(password) {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^0-9a-zA-Z])(?=.*[0-9]).{6,}$/.test(password);
  }
}

export default new Validation();
