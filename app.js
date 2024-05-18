"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./src/routes");
const data_source_1 = require("./src/db/data-source");
const exceptions_middleware_1 = require("./src/middleware/exceptions.middleware");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco inicializado!");
})
    .catch((err) => {
    console.error("Erro durante a inicialização do banco: ", err);
});
const app = express();
app.use(express.json());
app.use("/user", routes_1.userRouter);
app.use("/product", routes_1.productRouter);
app.use("", routes_1.publicRouter);
app.use(exceptions_middleware_1.default);
app.listen(8000);
