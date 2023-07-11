const connection = require('../../utils/connection')
const router = require('express').Router()
const escapeRegex = require('../utils/escapeRegex')
const {readJSONFile} = require('../utils/ReadWriteJSON')

const NUM_DOC_DEFAULT = 100

router.get('/', async (req, res) => {
    const db = await connection()
    const firstName = req.query.firstName
    const lastName = req.query.lastName
    const projection = req.query.extended == true ? {} : readJSONFile('queries/globals/filterFields.json')
    let limit = parseInt(req.query.limit)
    limit = Number.isInteger(limit) ? limit : NUM_DOC_DEFAULT
    if (!(firstName || lastName)) {
        res.status(400).json({
            error: `No keywords given`
        })
        return
    }
    const books = await db.collection('audiobooks').find({
        authors: {
            $elemMatch: {
                first_name: { $regex: new RegExp(escapeRegex(firstName), 'i') },
                last_name: { $regex: new RegExp(escapeRegex(lastName), 'i') }
            }
        }
    }).project(projection).limit(limit).toArray()

        // console.log(books[0])
    res.json(books)
})

module.exports = router