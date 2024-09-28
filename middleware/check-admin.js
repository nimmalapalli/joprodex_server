const checkAdmin = (req, res, next) => {
    if (req.userData.role !== 'admin' && req.userData.role !== 'superAdmin') {
        return res.status(403).json({ success: false, message: 'Access denied: Admins only.' });
    }
    next();
};

const checkSuperAdmin = (req, res, next) => {
    if (req.userData.role !== 'superAdmin') {
        return res.status(403).json({ success: false, message: 'Access denied: Super Admins only.' });
    }
    next();
};

module.exports = { checkAdmin, checkSuperAdmin };