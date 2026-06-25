import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import weatherRoutes from "./routes/weather.routes.js";

dotenv.config({ override: true });

const app = express();

app.use(express.json());

// 1. CORS Configuration (Frontend ko Allow karna)
const corsOptions = {
    origin: 'http://localhost:5173', // Aapke React (Vite) app ka URL
    methods: 'GET,POST,PUT,DELETE',  // Allowed methods
    credentials: true                // Agar cookies ya authorization headers bhejne hon
};

// 2. Middlewares (Order is very important!)
app.use(cors(corsOptions)); // CORS sabse pehle aayega


// routers
app.use('/api/v1/weather', weatherRoutes);

// port running

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
