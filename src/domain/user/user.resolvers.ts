import { allUsers, UserRepository } from "../../utils/db.js";
import { createToken } from "../../auth/jwt";
import { createPassword } from "../../auth/password";
import { User as UserInput } from "../../models/user.model";

export const userResolver = {
  Query: {
    getUsers: async () => {
      const usr = await UserRepository.getAll();

      console.log(allUsers);

      return usr;
    },
    getUserByEmail: async (
      _: any,
      input: { email: string },
      _context: any,
      _info: any
    ) => {
      return await UserRepository.getByEmail(input.email);
    },
    getUserById: async (
      _: any,
      input: { id: string },
      _context: any,
      _info: any
    ) => {
      return await UserRepository.getById(input.id);
    },
    authorizeUser: async (
      _: any,
      _input: { email: string; password: string },
      _context: any,
      _info: any
    ) => {
      // const token =
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      input: { user: UserInput },
      _context: any,
      _info: any
    ) => {
      const { user } = input;
      const userExist = await UserRepository.exist(user.email);
      if (userExist) {
        throw new Error(`User ${user.email} already exist`);
      }

      const password = createPassword(user.password);

      return await UserRepository.insert({ ...user, hash: password });
    },
  },
};
