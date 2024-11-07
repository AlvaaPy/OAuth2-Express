import express from "express";
import passport from "passport"
import jwt from 'jsonwebtoken'; 
import { register, login, me, logout, loginApi } from "../controllers/userControllers.js";
import protect from "../middleware/userMiddleware.js"; 
import { create, deleteContent, getAllContent, getContentById, updateContent } from "../controllers/contentController.js";

const router = express.Router();

// Login - Register - Dashboard
router.get('/login', (req, res) => {
    res.render('login'); // Render halaman login
});

router.post('/login', login);

router.post('/login-api', loginApi);

router.post('/daftar', register);

router.get('/me', protect, me); 

router.get('/dashboard', protect, (req, res) => {
    res.render('dashboard', { user: req.user }); // Kirim data user ke halaman
});

// OAuth2
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    // Jika login berhasil, buat token JWT untuk pengguna
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Simpan token di session
    req.session.token = token;

    // Redirect ke dashboard
    res.redirect('/dashboard');
  }
);


// route content
router.post('/content', protect, create)
router.get('/content', protect, getAllContent)
router.get('/content/:id', protect, getContentById)
router.put('/content/:id', protect, updateContent)
router.delete('/content/:id', protect, deleteContent)

  // Rute untuk logout
router.get('/logout', logout);



export default router;
