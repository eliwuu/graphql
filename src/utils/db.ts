import { open } from "sqlite";
import sqlite from "sqlite3";
import { User  } from "../../src/models/user.model";
import { v4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore";
import dotenv from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
dotenv.config();
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

// export const db = await open({
//   filename: "db.sqlite",
//   driver: sqlite.Database,
// });

// const userQueries = {
//   getAll: `SELECT * FROM USERS;`,
//   getById: (id: string) => `SELECT * FROM USERS WHERE id = '${id}';`,
//   getByEmail: (email: string) =>
//     `SELECT * FROM USERS WHERE email = '${email}';`,
//   insert: (user: UserInput, id: string) => `INSERT INTO USERS VALUES
//   ("${id}", "${user.firstName}", "${user.lastName}", "${user.email}");`,
// };

// export const UserRepository = {
//   getAll: async () => db.all<UserInput & { id: string }>(userQueries.getAll),
//   getById: async (id: string) =>
//     await db.get<UserInput & { id: string }>(userQueries.getById(id)),
//   getByEmail: async (email: string) =>
//     await db.get<UserInput & { id: string }>(userQueries.getByEmail(email)),
//   exist: async (email: string) => {
//     const user = await db.all(userQueries.getByEmail(email));

//     if (user.length > 0) return true;

//     return false;
//   },
//   insert: async (user: UserInput) => {
//     const id = v4();
//     await db.exec(userQueries.insert(user, id));

//     return await db.get<UserInput & { id: string }>(userQueries.getById(id));
//   },
// };


export abstract class Repository<T> {
  constructor(private readonly db: Firestore) {}

  public declare async getById(id: string): Promise<T>;
}

export class UserRepository extends Repository<User>{
  private readonly userCollection: 
  constructor(db: Firestore) {
    super(db);
  }
  public static async getById(id: string) {
    await this.db.
  } 
} 