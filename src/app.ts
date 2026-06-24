import express from "express";
import morgan from "morgan";
import "colors";
import "dotenv/config";
import index from "./routes/index.route";
import user from "./routes/users.route";
import category from "./routes/category.route";
import product from "./routes/product.route";
import inventory from "./routes/inventory.route";
import report from "./routes/report.route";
import cors from "cors";
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

app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

app.get("/api-docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Inventario Restaurante</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/api-docs.json',
              dom_id: '#swagger-ui'
            })
          }
        </script>
      </body>
    </html>
  `);
});

app.use((req, res) => {
  res.status(404).json({ ok: false, msg: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`.bgBlue);
});

export default app;
