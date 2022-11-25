import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { allUsers, User } from "./utils/db.js";
import { UserInput } from "./models.js";
import dotenv from "dotenv";

const app = express();

const typeDefs = `#graphql
type User {
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  salt: String,
  hash: String,
}
type Query {
  users: [User]
  getUserByEmail(email: String): User
  getUserById(id: String): User
}

input UserInput {
  firstName: String!,
  lastName: String!,
  email: String!
}

type Mutation {
  addUser(user: UserInput): User
}
`;

const resolvers = {
  Query: {
    users: async () => {
      const usr = await User.getAll();

      console.log(allUsers);

      return usr;
    },
    getUserByEmail: async (
      _: any,
      input: { email: string },
      _context: any,
      _info: any
    ) => {
      return await User.getByEmail(input.email);
    },
    getUserById: async (
      _: any,
      input: { id: string },
      _context: any,
      _info: any
    ) => {
      return await User.getById(input.id);
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      input: { user: UserInput },
      _context: any,
      _info: any
    ) => {
      const { user } = input;
      const userExist = await User.exist(user.email);
      if (userExist) {
        throw new Error(`User ${user.email} already exist`);
      }
      return await User.insert(user);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(express.json());

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const token = req.headers.authorization ?? "";
    },
  })
);
app.listen(3000, () => {
  console.log("port 3000");
});
