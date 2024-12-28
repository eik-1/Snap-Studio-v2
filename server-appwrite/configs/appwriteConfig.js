import dotenv from "dotenv";
import { Account, Client, Databases, Storage } from "node-appwrite";
dotenv.config();

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const projectId = process.env.APPWRITE_PROJECTID;
const apiKey = process.env.APPWRITE_API_KEY;
const endpoint = process.env.APPWRITE_ENDPOINT;

client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);

export { account, client, databases, storage };
