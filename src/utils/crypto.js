import argon2 from "argon2";

/*
  Why choose argon2 over bcrypt?
  https://security.stackexchange.com/questions/193351/in-2018-what-is-the-recommended-hash-to-store-passwords-bcrypt-scrypt-argon2
*/

export const hash = async (text) => {
  try {
    return await argon2.hash(text);
  } catch (e) {
    console.error("Something went wrong while hashing");
    return null;
  }
};

export const verifyHash = async (hashedText, text) => {
  try {
    return await argon2.verify(hashedText, text); // returns true if valid, false if invalid
  } catch (e) {
    console.error("Something went wrong while verifying hashed string");
    return false;
  }
};
