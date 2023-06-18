const connection = require('../../utils/connection')
const router = require('express').Router()
const escapeRegex = require('../utils/escapeRegex')
const {readJSONFile} = require('../utils/ReadWriteJSON')

const NUM_DOC_DEFAULT = 100


router.get('/', async (req, res) => {
    const db = await connection()
    const projection = req.query.extended == true ? {} : readJSONFile('queries/globals/filterFields.json')
    
    const genre = decodeURIComponent(req.query.genre)
    console.log(genre)
    let limit = parseInt(req.query.limit)
    limit = Number.isInteger(limit) ? limit : NUM_DOC_DEFAULT

    if (!genre) {
        res.status(400).json({
            error: `No keywords given`
        })
        return
    }
    const books = await db.collection('audiobooks').find({
        genres: { $elemMatch: { name: { $regex: new RegExp(escapeRegex(genre), 'i') } } },
    }).project(projection).limit(limit).toArray()

    // console.log(books[0])
    res.json(books)
})

module.exports = router