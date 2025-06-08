
const sessionAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {

        if (req.originalUrl.startsWith('/api/')) {
            return res.status(401).json({ message: 'Acesso não autorizado. Faça login.' });
        } else {
            return res.redirect('/login');
        }
    }
}


module.exports = sessionAuth