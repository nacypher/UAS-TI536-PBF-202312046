const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.formLogin = (req, res) => {
    res.render('auth/login', { title: 'Login', error: req.flash('error') });
};

exports.formRegister = (req, res) => {
    res.render('auth/register', { title: 'Register', error: req.flash('error') });
};

exports.processRegister = async (req, res) => {
    try {
        const { username, password, nama_lengkap } = req.body;
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            req.flash('error', 'Username sudah dipakai.');
            return res.redirect('/auth/register');
        }
        await User.create({ username, password, nama_lengkap });
        req.flash('success', 'Registrasi sukses! Silakan login.');
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Server error.');
        res.redirect('/auth/register');
    }
};

exports.processLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            req.flash('error', 'Username atau Password salah.');
            return res.redirect('/auth/login');
        }

        req.session.userId = user.id;
        req.session.user = { id: user.id, username: user.username, nama_lengkap: user.nama_lengkap };
        res.redirect('/activities');
    } catch (error) {
        console.error(error);
        res.redirect('/auth/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'));
};