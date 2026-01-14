exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.redirect('/auth/login');
};

exports.isGuest = (req, res, next) => {
    if (req.session && req.session.userId) {
        return res.redirect('/activities');
    }
    next();
};