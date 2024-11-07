import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import router from "./routes/userRoutes.js";
import session from 'express-session';
import passport from 'passport'; // Pastikan ini diimpor
import './passport.js'; // Impor file yang berisi konfigurasi passport

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk parsing data form

app.use(session({
    secret: process.env.SESSION_SECRET, // Buat variabel SESSION_SECRET di .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set 'true' jika menggunakan HTTPS
  }));

app.use(passport.initialize()); // Inisialisasi Passport
app.use(passport.session()); // Gunakan session Passport

// Set view engine ke EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Folder untuk template EJS

app.use("/", router);


connectDB();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
