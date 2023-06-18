const connection = require('../../utils/connection')
const router = require('express').Router()
const {readJSONFile} = require('../utils/ReadWriteJSON')


const NUM_DOC_DEFAULT = 100


router.get('/', async (req, res) => {
    const db = await connection()
    let {from, to, limit} = req.query

    limit = parseInt(limit)

    limit = Number.isInteger(limit) ? limit : NUM_DOC_DEFAULT
    const projection = req.query.extended == true ? {} : readJSONFile('queries/globals/filterFields.json')


    console.log(from, to)
    if (!Number.isInteger(parseInt(from)) || !Number.isInteger(parseInt(to))) {
        res.status(400).json({
            error: `from and to in incorrect format`
        })
        return
    }

    const books = await db.collection('audiobooks').find({
        copyright_year : {
            $gte : from,
            $lt : to
        }
    }).limit(limit).toArray()

    res.json(books)
})

module.exports = router