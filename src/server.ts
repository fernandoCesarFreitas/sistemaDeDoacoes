import express, { Express } from "express";
import cors from "cors";
let server: Express = express();
let port: Number = Number(process.env.server_port || 3000);

server.use(cors());
server.use(express.json());

//chama a rota de usuarios
// server.use(usuariosRoutes);
// server.use(produtosRoutes);
//iniciar servidor
export default {
  start() {
    server.listen(port, () => {
      console.log("servidor iniciado na porta 3000");
    });
  },
};
