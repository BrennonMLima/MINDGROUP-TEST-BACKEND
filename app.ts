import * as express from "express";
import { publicRouter, userRouter } from "./src/routes";
import { AppDataSource } from "./src/db/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Banco inicializado!");
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do banco: ", err);
  });

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("", publicRouter);

app.listen(8000);