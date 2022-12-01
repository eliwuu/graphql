import jsonwbebtoken from "jsonwebtoken";

export const createToken = (email: string, role: string) => {
  const token = jsonwbebtoken.sign({ email, role }, "abcd", {
    expiresIn: 60 * 60 * 15,
    issuer: "",
  });

  return token;
};

export const verifyToken = (token: string) => {
  const verified = jsonwbebtoken.verify(token, "abcd");

  console.log(verified);

  return verified;
};

export const refreshToken = (token: string) => {
  const verifiedToken = verifyToken(token) as string;

  const payload = jsonwbebtoken.decode(verifiedToken, { json: true });
  // payload.

  console.log(payload);
  // const refreshed = createToken(email, role);

  // return refreshed;
};
