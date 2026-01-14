const Activity = require('../models/Activity');

exports.index = async (req, res) => {
    try {
        const userId = req.session.userId;
        const activities = await Activity.getAllByUserId(userId, req.query);
        res.render('activities/index', {
            title: 'Daftar Aktivitas',
            activities,
            query: req.query,
            user: req.session.user,
            success: req.flash('success'),
            error: req.flash('error')
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.create = (req, res) => {
    res.render('activities/create', { title: 'Tambah Aktivitas', user: req.session.user, error: req.flash('error') });
};

exports.store = async (req, res) => {
    try {
        const { judul_aktivitas, kategori, tanggal } = req.body;
        if (!judul_aktivitas || !kategori || !tanggal) {
            req.flash('error', 'Semua data wajib diisi.');
            return res.redirect('/activities/create');
        }
        await Activity.create({ user_id: req.session.userId, judul_aktivitas, kategori, tanggal });
        req.flash('success', 'Aktivitas berhasil disimpan.');
        res.redirect('/activities');
    } catch (error) {
        console.error(error);
        res.redirect('/activities/create');
    }
};

exports.edit = async (req, res) => {
    try {
        const activity = await Activity.getById(req.params.id, req.session.userId);
        if(!activity) return res.redirect('/activities');
        res.render('activities/edit', { title: 'Edit Aktivitas', activity, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.redirect('/activities');
    }
};

exports.update = async (req, res) => {
    try {
        const { judul_aktivitas, kategori, tanggal } = req.body;
        await Activity.update(req.params.id, req.session.userId, { judul_aktivitas, kategori, tanggal });
        req.flash('success', 'Aktivitas berhasil diupdate.');
        res.redirect('/activities');
    } catch (error) {
        console.error(error);
        res.redirect('/activities');
    }
};

exports.destroy = async (req, res) => {
    try {
        await Activity.delete(req.params.id, req.session.userId);
        req.flash('success', 'Aktivitas dihapus.');
        res.redirect('/activities');
    } catch (error) {
        console.error(error);
        res.redirect('/activities');
    }
};