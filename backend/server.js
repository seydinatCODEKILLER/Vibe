import express from "express";
import downloadRouter from "./routes/downloadRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//Variables
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Routes de l'api
app.use("/download", downloadRouter);

//Middleware d'erreur
app.use(errorMiddleware);

//Lancement du serveur
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
startServer();
