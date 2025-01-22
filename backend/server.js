import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import downloadRouter from "./routes/downloadRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import connectDB from "./configuration/dbConfig.js";
import path from "path";
import { fileURLToPath } from "url";

//Variables
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes de l'api
app.use("/download", downloadRouter);

//Middleware d'erreur
app.use(errorMiddleware);

//Lancement du serveur
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
startServer();
