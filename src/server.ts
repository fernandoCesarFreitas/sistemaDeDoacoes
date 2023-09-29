import express, { Express,Request,Response, NextFunction } from "express";
import cors from "cors";
import voluntariosRoutes from './routes/voluntarios';
import pessoasRoutes from './routes/pessoas';
import movimentacaoRoutes from './routes/movimentacoes';
import itensRoutes from './routes/itens';
import cidadesRoutes from './routes/cidades';
import cdsRoutes from './routes/cds';
import categoriasRoutes from './routes/categorias';
let server: Express = express();
let port: Number = Number(process.env.server_port || 3000);

server.use(cors());
server.use(express.json());

server.use((req:Request, res:Response, next: NextFunction)=>{
  console.log('['+(new Date)+ ']'+req.method +' '+req.url);
  next();
});

// chama a rota de usuarios
server.use(voluntariosRoutes);
server.use(pessoasRoutes);
server.use(movimentacaoRoutes);
server.use(itensRoutes);
server.use(cidadesRoutes);
server.use(cdsRoutes);
server.use(categoriasRoutes);
// iniciar servidor
export default {
  start() {
    server.listen(port, () => {
      console.log("servidor iniciado na porta 3000");
    });
  },
};
