const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Middleware Config
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session Config
app.use(session({
    secret: 'kunci_rahasia_uas_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 hari
}));

app.use(flash());

// Global Variables untuk Views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const detailRoutes = require('./routes/detailRoutes');
const { isAuthenticated } = require('./middleware/authMiddleware');

// Route Handling
app.use('/auth', authRoutes);
app.use('/activities', isAuthenticated, activityRoutes);
app.use('/details', isAuthenticated, detailRoutes);

// Root Route
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/activities');
    } else {
        res.redirect('/auth/login');
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server UAS berjalan di http://localhost:3000`);
});