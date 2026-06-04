import express from "express";
import morgan from "morgan";
import "colors";
import "dotenv/config";
import index from "./routes/index.route";
import user from "./routes/users.route";
import category from "./routes/category.route";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const URL_LOCAL = process.env.URL_LOCAL;
const URL_RESTAURANTE = process.env.URL_RESTAURANTE;

if (!URL_LOCAL || !URL_RESTAURANTE) {
  console.error("Error en la configuracion de las cors");
  process.exit(1);
}

app.use(
  cors({
    origin: [URL_LOCAL, URL_RESTAURANTE],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.use(index);
app.use("/api/v1", user);
app.use("/api/v1", category);

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
  next();
});

app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`.bgBlue);
});
