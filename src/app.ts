import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { userResolver } from "./domain/user/user.resolvers.js";
import { authMiddleware } from "./auth/auth.middleware.js";
import fs from "fs/promises";
import path from "path";

const app = express();

const typedefPath = path.resolve(
  "src",
  "domain",
  "user",
  "user.typdefs.graphql"
);

console.log(typedefPath);

const loadTypedefs = await fs.readFile(typedefPath, { encoding: "utf-8" });

const server = new ApolloServer({
  typeDefs: [loadTypedefs],
  resolvers: [userResolver],
});

await server.start();

app.use(express.json());

app.use(
  "/graphql",
  authMiddleware,
  expressMiddleware(server, {
    // context: async (req, res, next) => {
    //   const token = req.headers.authorization ?? "";
    //   return token;
    // },
  })
);

app.listen(3000, () => {
  console.log("port 3000");
});
