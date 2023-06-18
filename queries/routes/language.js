const connection = require('../../utils/connection')
const router = require('express').Router()
const escapeRegex = require('../utils/escapeRegex')
const {readJSONFile} = require('../utils/ReadWriteJSON')

const NUM_DOC_DEFAULT = 100

module.exports = router.get('/', async (req, res) => {
    const language = req.query.language
    if (!language) {
        res.status(400).json({
            error: `No language given`
        })
    }

    const db = await connection()
    const projection = req.query.extended == true ? {} : readJSONFile('queries/globals/filterFields.json')

    const docs = await db.collection('audiobooks').find({
        language: {$regex : new RegExp(escapeRegex(language), 'i')}
    }).project(projection).limit(NUM_DOC_DEFAULT).toArray()

    res.status(200).json(docs)
})