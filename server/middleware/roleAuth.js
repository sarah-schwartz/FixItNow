// middleware/roleAuth.js
const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied. Required roles: ${allowedRoles.join(', ')}` 
            });
        }
        
        next();
    };
};

const isAdmin = checkRole('admin');
const isDeveloper = checkRole('developer');
const isSupport = checkRole('support');
const isAdminOrSupport = checkRole('admin', 'support');
const isAdminOrDeveloper = checkRole('admin', 'developer');
const isAnyRole = checkRole('admin', 'developer', 'support');

module.exports = {
    checkRole,
    isAdmin,
    isDeveloper,
    isSupport,
    isAdminOrSupport,
    isAdminOrDeveloper,
    isAnyRole
};