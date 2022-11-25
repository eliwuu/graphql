import { db } from "./db.js";
import { v4 } from "uuid";

const createTable = `
CREATE TABLE USERS (
  id varchar(64),
  firstName varchar(255),
  lastName varchar(255),
  email varchar(255)
);`;

const insertQuery = `
INSERT INTO USERS (id, firstName, lastName, email) VALUES 
( "${v4()}", "a", "b", "ab@b.c"),
( "${v4()}", "o", "b", "ob@b.c"),
( "${v4()}", "i", "x", "ix@b.c"),
( "${v4()}", "u", "d", "ud@b.c");
`;

await db.exec(createTable);

await db.exec(insertQuery);
