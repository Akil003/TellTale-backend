const connection = require('../utils/connection')
const router = require('express').Router()

const NUM_DOC_DEFAULT = 100

router.get('/', async (req, res) => {
    const db = await connection()
    const _id = req.query._id
    if (!_id){
        res.status(400).json({
            error: `_id field missing`
        })
        return
    }
    const book = await db.collection('audiobooks').findOne({
        _id: _id
    })

    res.json(book)
})

module.exports = router