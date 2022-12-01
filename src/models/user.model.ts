import uuid from "uuid";
export type UserId = string & { __type: "UserId" };
export type Group = {
  id: string;
  groupOwner: UserId;
  participants: UserId[];
};

export type User = {
  id: UserId;
  firstName: string;
  lastName: string;
  email: string;
  hash: string;
};

export type UserCreate = Omit<User, "id" | "hash"> & { password: string };
export type UserLogin = { email: string; password: string };

export const isUserId = (userId: string): userId is UserId => {
  return uuid.validate(userId);
};
