const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const { sequelize } = require("./models");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME || "etoile_blanche";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "API Etoile Blanche funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

async function createDatabaseIfNeeded() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
}

async function startServer() {
  try {
    await createDatabaseIfNeeded();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`Base de datos conectada: ${DB_NAME}`);
    });
  } catch (error) {
    console.error("No se pudo conectar con la base de datos.");
    console.error("Detalle:", error.message || error);
    console.error("Revisa que MySQL este iniciado, que el puerto sea 3306 y que usuario/password coincidan con Backend/.env");
  }
}

startServer();
