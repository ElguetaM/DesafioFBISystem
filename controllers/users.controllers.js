import { users } from "../data/agentes.js";
import jwt from "jsonwebtoken";
import path from "path";

process.loadEnvFile();

const myKey = process.env.SECRET_KEY;
const __dirname = import.meta.dirname;

export const index = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getDashboard = (req, res) => {
  try {
    const { token } = req.query;
    jwt.verify(token, myKey, (err, decoded) => {
      err
        ? res.status(401).send({
            error: "Agente, su tiempo ha expirado",
            message: err.message,
          })
        : res.send(`Bienvenido al Dashboard Agente <b>${decoded.data.email}`);
    });
  } catch (error) {
    res.status(401).send({
      error: "Agente no autorizado",
      message: error.message,
    });
  }
};

export const signUser = (req, res) => {
  try {
    const { email, password } = req.query;
    const user = users.find((user) => {
      return user.email === email && user.password === password;
    });
    if (user) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 120,
          data: user,
        },
        myKey
      );
      res.send(
        `<p>Bienvenido Agente <b>${email}</p>
          <a href=/dashboard?token=${token}>Ir a Dashboard</a>
          <script>
          localStorage.setItem('token', JSON.stringify('${token}'))
          </script>`
      );
    } else {
      res.send(
        "No se ha podido iniciar sesion, email o contraseña incorrectos"
      );
    }
  } catch (error) {
    res.status(500).send({
      error: "Error 500, no se ha podido cumplir con la solicitud",
      message: error.message,
    });
  }
};
