const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const userRouter = require("./routes/api/users");
// const productRouter = require('./routes/api/products')


app.use(morgan("dev"));
app.use(express.json());
const DB = mongoose
    .connect(
        process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD),
    )
    .then(() => {
        console.log("DB CONNECTION SUCCESSFUL!");
    });

app.use("/api/users", userRouter);

// maybe take out "/backend/routes"
// app.use("/api/products", productRouter)

app.all("*", (request, response) => {
    response.send("Undefined route");
});
const port = 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});