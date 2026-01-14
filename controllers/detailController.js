const Activity = require('../models/Activity');
const ActivityDetail = require('../models/ActivityDetail');

exports.index = async (req, res) => {
    try {
        const { activityId } = req.params;
        const activity = await Activity.getById(activityId, req.session.userId);
        
        if (!activity) {
            req.flash('error', 'Akses ditolak atau aktivitas tidak ditemukan.');
            return res.redirect('/activities');
        }

        const details = await ActivityDetail.getByActivityId(activityId);
        const totalDuration = await ActivityDetail.getTotalDuration(activityId);

        // Render ke views/details/index.ejs
        res.render('details/index', {
            title: 'Detail Aktivitas',
            activity,
            details,
            totalDuration,
            user: req.session.user,
            success: req.flash('success'),
            error: req.flash('error')
        });
    } catch (error) {
        console.error(error);
        res.redirect('/activities');
    }
};

exports.store = async (req, res) => {
    try {
        const { activityId } = req.params;
        const { deskripsi_detail, durasi, status } = req.body;

        if (!deskripsi_detail || !durasi) {
            req.flash('error', 'Deskripsi dan Durasi wajib diisi.');
            return res.redirect(`/details/${activityId}`);
        }

        await ActivityDetail.create({ activity_id: activityId, deskripsi_detail, durasi, status: status || 'Belum' });
        req.flash('success', 'Detail ditambahkan.');
        res.redirect(`/details/${activityId}`);
    } catch (error) {
        console.error(error);
        res.redirect(`/details/${req.params.activityId}`);
    }
};

exports.edit = async (req, res) => {
    try {
        const detail = await ActivityDetail.getById(req.params.id);
        const activity = await Activity.getById(detail.activity_id, req.session.userId);
        res.render('details/edit', { title: 'Edit Detail', detail, activity, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.redirect('/activities');
    }
};

exports.update = async (req, res) => {
    try {
        const { deskripsi_detail, durasi, status, activity_id } = req.body;
        await ActivityDetail.update(req.params.id, { deskripsi_detail, durasi, status });
        req.flash('success', 'Detail diupdate.');
        res.redirect(`/details/${activity_id}`);
    } catch (error) {
        console.error(error);
        res.redirect('/activities');
    }
};

exports.destroy = async (req, res) => {
    try {
        const detail = await ActivityDetail.getById(req.params.id);
        const activityId = detail.activity_id;
        await ActivityDetail.delete(req.params.id);
        req.flash('success', 'Detail dihapus.');
        res.redirect(`/details/${activityId}`);
    } catch (error) {
        console.error(error);
        res.redirect('/activities');
    }
};