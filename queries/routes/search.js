const connection = require('../../utils/connection')
const router = require('express').Router()

const NUM_DOC_DEFAULT = 100
const {readJSONFile} = require('../utils/ReadWriteJSON')


router.get('/', async (req, res) => {
    const db = await connection()
    const keywords = req.query.keywords
    let limit = parseInt(req.query.limit)
    limit = Number.isInteger(limit) ? limit : NUM_DOC_DEFAULT

    const projection = req.query.extended == true ? {} : readJSONFile('queries/globals/filterFields.json')

    if (!keywords) {
        res.status(400).json({
            error : `No keywords given`
        })
    }
    const books = await db.collection('audiobooks').find({
        $text: {
            $search : keywords
        }
      }).project(projection).limit(limit).toArray()

    res.json(books)
})

module.exports = router