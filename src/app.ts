import express from "express";
import morgan from "morgan";
import "colors";
import "dotenv/config";
import index from "./routes/index.route";
import user from "./routes/users.route";
import category from "./routes/category.route";
import product from "./routes/product.route";
import inventory from "./routes/inventory.route";
import report from "./routes/report.route"
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

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
app.use("/api/v1", product);
app.use("/api/v1", inventory);
app.use("/api/v1", report);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((req, res) => {
  res.status(404).json({ ok: false, msg: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`.bgBlue);
});

export default app; 