import { registerUser, loginUser } from "../services/auth.service.js";

export async function register(request, response, next) {
  try {
    const { email, password } = request.body;

    const user = await registerUser(email, password);

    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    const result = await loginUser(email, password);

    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
