const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const router = require("./server/routes/router");
const productRouter = require("./server/routes/product");
const reqDetials = require("./server/middlewares/requestDetails");
const errorHandler = require("./server/middlewares/errorHandler");
const notFound = require("./server/middlewares/404");
const connectDB = require("./server/db/connection");
dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

app.use(reqDetials);
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/static/css", express.static(path.join(__dirname, "/public/css")));
app.use("/static/js", express.static(path.join(__dirname, "/public/js")));
app.use("/static/", express.static(path.join(__dirname, "/public/pages")));
app.use("/api/v1/tasks", router);
app.use("/api/v1/products", productRouter);
app.use(errorHandler);
const basePath = path.join(__dirname, "public");

app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html"));
});

app.get("/edit/:id", (req, res) => {
  res.sendFile(path.join(basePath, "pages/edit.html"));
});
app.get("/editstore/:id", (req, res) => {
  res.sendFile(path.join(basePath, "pages/editstore.html"));
});

app.get("/store", (req, res) => {
  res.sendFile(path.join(basePath, "pages/store.html"));
});

app.use(notFound);
const serverListen = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

connectDB(URI, serverListen);
