const connection = require('../../utils/connection')
const router = require('express').Router()

router.get('/', async (req, res) => {
    const email = req.query.email

    if (!email || email == ''){
        return res.status(200).json([])
    }

    const db = await connection()
    const record = await db.collection('records').findOne({_id : email});
    if (!record){
        return res.status(200).json([])
    }

    return res.status(200).json(record.ebooks)
})

module.exports = router