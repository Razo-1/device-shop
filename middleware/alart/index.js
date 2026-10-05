const { ObjectId } = require("mongodb");
const { conectDB, getDB } = require("../../DB");

const alreadyExists = async (req,res,next) => {

    const { id } = req.body
    const { sessionId } = req.user;

    try{
        await conectDB('usersDB');
        const db = getDB();

        const bool = await db.collection('users').findOne(
            {
                _id: new ObjectId(sessionId),
                "cart.id": new ObjectId(id)
            }
        )

        if(bool){
            return res.status(400).json({msg : 'The device has already been added!', ok : false});
        }
        next()
    }catch(err){
        res.status(500).json({err})
    }
}

module.exports = { alreadyExists }