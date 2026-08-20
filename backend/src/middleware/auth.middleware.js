import { verifyAccessToken } from "../utils/jwt.js";

export function authenticate(request, response, next) {
  try {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return response.status(401).json({
        error: "Authentication required",
      });
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return response.status(401).json({
        error: "Invalid authorization header",
      });
    }

    const payload = verifyAccessToken(token);

    request.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (error) {
    return response.status(401).json({
      error: "Invalid or expired token",
    });
  }
}
