import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';



//Cargar variable de entorno
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json()); //Para leer los json



app.listen(PORT, ()=>{
    console.log(`Server Express corriendo en puerto ${PORT}`);
})
