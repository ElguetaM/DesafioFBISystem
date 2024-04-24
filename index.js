import express from "express";
import usersRoutes from "./routes/users.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", usersRoutes);

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
