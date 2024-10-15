const BlockModel = require('./model.js');

// Blocklayacağımız kullanıcıyı blokluyoruz
exports.BlockUser = async function(req, res, next) {
    try {
        const { blocker, blocked } = req.body;
        const block = new BlockModel({ blocker: blocker, blocked: blocked });
        await block.save(); // Callback yerine await kullan
        return res.status(200).json({ message: "User blocked successfully" });
    } catch (err) {
        return res.status(400).json({ message: "Error occurred while blocking user" });
    }
}

// Blocklananları geri getireceğiz
exports.UnblockUser = async function(req, res, next) {
    try {
        const { blocker, blocked } = req.body;
        await BlockModel.deleteOne({ blocker: blocker, blocked: blocked }); // Callback yerine await kullan
        return res.status(200).json({ message: "User unblocked successfully" });
    } catch (err) {
        return res.status(400).json({ message: "Error occurred while unblocking user" });
    }
}

// Blocklananları göstereceğiz
exports.GetBlockedUsers = async function(req, res, next) {
    try {
        const { blocker } = req.body;
        //const blockedusers = await BlockModel.find({ blocker: blocker });
        const blockedusers = await BlockModel.find({ blocker: blocker }).select('blocked -_id'); // Sadece blocked alanını seç

        return res.status(200).json({ blockedusers });
    } catch (err) {
        return res.status(400).json({ message: "Error occurred while fetching blocked users" });
    }
}

// Blocklanmış mı check ediyoruz
exports.CheckBlocked = async function(req, res, next) {
    try {
        const { blocker, blocked } = req.body;
        const blockeds = await BlockModel.findOne({ blocker: blocker, blocked: blocked });
        return res.status(200).json({ blockeds });
    } catch (err) {
        return res.status(400).json({ message: "Error occurred while checking block status" });
    }
}

/*
    const {blockername,blockedname} = req.body;
    BlockSchema.create({blockername,blockedname},function(err,block){
        if(err){
            return res.status(400).json({message:"Error occured while blocking user"});
        }
        return res.status(200).json({message:"User blocked successfully"});
    })
*/


/*
    const {blockername, blockedname} = req.body;
    BlockModel.deleteOne({blockername:blockername,blockedname:blockedname},function(err){
        if(err){
            return res.status(400).json({message:"Error occured while unblocking user"});
        }
        return res.status(200).json({message:"User unblocked successfully"});
    })
*/