import { open } from "sqlite";
import sqlite from "sqlite3";
import { UserInput } from "../models.js";
import { v4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import dotenv from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const _ = dotenv.config();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const dataStore = getFirestore(firebase);

const userCollection = collection(dataStore, "users");

const usersFromCollection = await getDocs(userCollection);

export const allUsers = usersFromCollection.docs.map((doc) => doc.data());

export const db = await open({
  filename: "db.sqlite",
  driver: sqlite.Database,
});

const userQueries = {
  getAll: `SELECT * FROM USERS;`,
  getById: (id: string) => `SELECT * FROM USERS WHERE id = '${id}';`,
  getByEmail: (email: string) =>
    `SELECT * FROM USERS WHERE email = '${email}';`,
  insert: (user: UserInput, id: string) => `INSERT INTO USERS VALUES
  ("${id}", "${user.firstName}", "${user.lastName}", "${user.email}");`,
};

const userByIdQuery = (id: string) => `
SELECT * FROM USERS WHERE id = "${id}";
`;

const userByEmailQuery = (email: string) => `
SELECT * FROM USERS WHERE email = '${email}';
`;

const userInsert = (user: UserInput, id: string) => `
INSERT INTO USERS VALUES
("${id}", "${user.firstName}", "${user.lastName}", "${user.email}") 
`;

// export const getUsers = db.all<UserInput & { id: string }>(userQueries.getAll);
// export const insertUser = async (user: UserInput) => {
//   const id = v4();
//   console.log(userInsert(user, id));
//   await db.exec(userInsert(user, id));

//   return await db.get<UserInput & { id: string }>(userByIdQuery(id));
// };

// export const checkIfUserExist = async (email: string) => {
//   const user = await db.all(userByEmailQuery(email));

//   if (user.length > 0) return true;

//   return false;
// };

// export const getUserByEmail = async (email: string) =>
//   await db.get<UserInput & { id: string }>(userByEmailQuery(email));

// export const getUserById = async (id: string) =>
//   await db.get<UserInput & { id: string }>(userQueries.getById(id));

export const User = {
  getAll: async () => db.all<UserInput & { id: string }>(userQueries.getAll),
  getById: async (id: string) =>
    await db.get<UserInput & { id: string }>(userQueries.getById(id)),
  getByEmail: async (email: string) =>
    await db.get<UserInput & { id: string }>(userByEmailQuery(email)),
  exist: async (email: string) => {
    const user = await db.all(userByEmailQuery(email));

    if (user.length > 0) return true;

    return false;
  },
  insert: async (user: UserInput) => {
    const id = v4();
    await db.exec(userQueries.insert(user, id));

    return await db.get<UserInput & { id: string }>(userByIdQuery(id));
  },
};
