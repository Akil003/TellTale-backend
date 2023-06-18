const connection = require('../../utils/connection')
const router = require('express').Router()
const escapeRegex = require('../utils/escapeRegex')

router.get('/', async (req, res) => {
    const db = await connection()
    const keywords = req.query.keywords
    if (!keywords) {
        res.status(400).json({
            error : `No keywords given`
        })
    }
    console.log(keywords)
    const regArray = keywords.split(' ').map(i => new RegExp(escapeRegex(i), 'i'))
    const books = await db.collection('audiobooks').find({
        $or: [
          { title: { $in: regArray } },
          { genres: { $elemMatch: { name: { $in: regArray } } } },
          { authors: { $elemMatch: { first_name: { $in: regArray } } }},
          { authors: { $elemMatch: { last_name: { $in: regArray } } }}
        ]
      }).toArray()

    res.json(books)
})

module.exports = router