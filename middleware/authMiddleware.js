const authenticateSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'superAdmin') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied: Super admin privileges required' });
  };
  
  module.exports = { authenticateSuperAdmin };