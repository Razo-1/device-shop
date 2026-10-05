const checkPassword = async (req, res, next) => {
    try {
        const { current, newPass } = req.body;
        const { sessionId } = req.user;

        if (newPass.trim().length < 8) {
            return res.status(401).json({
                msg: 'New password must be at least 8 characters',
                ok: false
            });
        }

        const user = await req.app.locals.services.profile.renderUserDate(sessionId);

        if (user.password !== current) {
            return res.status(401).json({
                msg: 'Current password is incorrect',
                ok: false
            });
        }

        next();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: error.message,
            ok: false
        });
    }
};

module.exports = { checkPassword };