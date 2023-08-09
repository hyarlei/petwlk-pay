import cors from "cors";
import express from "express";
import { firebase } from "./src/config/firebase";
import routes from "./src/routes";
firebase;
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3032, () => {});

console.log("Server running on port 3032");