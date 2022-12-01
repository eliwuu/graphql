import { Request, Response, NextFunction } from "express";
export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization ?? "";
  if (auth === "") {
    console.log("unauthorized");
  } else {
    console.log("auth: " + auth);
  }

  next();
};
