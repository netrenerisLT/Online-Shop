const bcrypt = require("bcryptjs");
const db = require("../data/database");
const mongodb = require("mongodb");

class User {
  constructor(email, password, fullname, street, postal, city, id) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  static findById(userId) {
    const uid = new mongodb.ObjectId(userId);
    return db
      .getDb()
      .collection("users")
      .findOne(
        {
          _id: uid,
        },
        { projection: { password: 0 } }
      );
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({
      email: this.email,
    });
  }

  async existingEmailAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  comparePassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
