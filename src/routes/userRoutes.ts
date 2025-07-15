import { Router } from "express";

const app = Router();

app.post('/register', registerUser);
app.post('/login', loginUser);
