const deposit = async (req,res,next) => {

    const { deposit } = req.body;

    if(deposit <= 0){
        return res.status(401).json({
                msg: 'The balance cannot be 0 or less.',
                ok: false
        });
    }

    if(typeof deposit !== 'number'){
        return res.status(401).json({
                msg: 'The balance must be a number.',
                ok: false
        });
    }

    next();
}

module.exports = { deposit }