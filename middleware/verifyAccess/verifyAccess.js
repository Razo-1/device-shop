async function verifyAccessToken(req, res, next) {
    try {
        const token = req.cookies.accessToken;
        
        if (!token) {
            return await tryRefresh(req, res, next);
        }

        const decoded = req.app.locals.services.auth.verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return await tryRefresh(req, res, next);
    }
}

async function tryRefresh(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.redirect('/auth/sign-in')
        }
        

        const newAccessToken = await req.app.locals.services.auth.refreshAccessToken(refreshToken);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        const decoded = req.app.locals.services.auth.verifyAccessToken(newAccessToken);
        req.user = decoded;
        next();
    } catch (err) {
        res.redirect('/auth/sign-in')
    }
}

module.exports = { verifyAccessToken };