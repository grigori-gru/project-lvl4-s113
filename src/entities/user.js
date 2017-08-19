export default class User {
  static id = 1;

  constructor(firstName, lastName, email, passwordDigest) {
    this.id = User.id;
    User.id += 1;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.passwordDigest = passwordDigest;
  }
}
