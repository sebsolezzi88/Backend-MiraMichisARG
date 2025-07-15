import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getMongoConnection } from './config/db';
//import "./models/loadModels";
import userRoutes from './routes/userRoutes';



//Cargar variable de entorno
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json()); //Para leer los json

getMongoConnection(); //Conexion con la base de datos

//Rutas
app.use('/api/user',userRoutes); //Rutas de User


app.listen(PORT, ()=>{
    console.log(`Server Express corriendo en puerto ${PORT}`);
})
