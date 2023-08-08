const connection = require('../../utils/connection')
const router = require('express').Router()
const {readJSONFile} = require('../utils/ReadWriteJSON')

const filters = readJSONFile('queries/globals/filterFields.json')

router.get('/', async (req, res) => {
    const db = await connection()
    const ids = JSON.parse(req.query.ids)
    console.log(ids)
    const projection = req.query.extended == true ? {} : filters
    if (ids == null || ids.length == 0) {
        res.status(400).json({
            error: `No ids given`
        })
        return
    }
    if (typeof ids != 'object'){
        res.status(400).json({
            error: `Ids must be an array`
        })
        return
    }
    const books = await db.collection('audiobooks').find({
        _id: {
            $in : ids.map(i => i+"")
        }
    }).project(projection).toArray()

    res.json(books)
})

module.exports = router