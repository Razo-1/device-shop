const toHome = async (req,res,next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (accessToken || refreshToken) {
        return res.redirect('/home')
    }

    next();
}

module.exports = { toHome }