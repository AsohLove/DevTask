import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail
} from "../repositories/user.repository.js";

import {
  createAccessToken
} from "../utils/jwt.js";


export async function registerUser(
  email,
  password
) {

  const existingUser =
    await findUserByEmail(email);


  if (existingUser) {

    const error =
      new Error(
        "Email already registered"
      );

    error.statusCode = 409;

    throw error;

  }


  const passwordHash =
    await bcrypt.hash(
      password,
      12
    );


  return createUser(
    email,
    passwordHash
  );

}


export async function loginUser(
  email,
  password
) {

  const user =
    await findUserByEmail(email);


  if (!user) {

    const error =
      new Error(
        "Invalid email or password"
      );

    error.statusCode = 401;

    throw error;

  }


  const passwordValid =
    await bcrypt.compare(
      password,
      user.password_hash
    );


  if (!passwordValid) {

    const error =
      new Error(
        "Invalid email or password"
      );

    error.statusCode = 401;

    throw error;

  }


  const accessToken =
    createAccessToken(user);


  return {
    accessToken
  };

}