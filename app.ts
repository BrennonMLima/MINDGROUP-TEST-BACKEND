import * as express from "express";
import { productRouter, publicRouter, userRouter } from "./src/routes";
import { AppDataSource } from "./src/db/data-source";
import exceptionsMiddleware from "./src/middleware/exceptions.middleware";
import * as cors from "cors"

AppDataSource.initialize()
  .then(() => {
    console.log("Banco inicializado!");
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do banco: ", err);
  });

const app = express();
app.use(cors())
app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("", publicRouter);
app.use(exceptionsMiddleware);

app.listen(8000);
