const router = require('express').Router()

const search = require('./routes/search')
const genre = require('./routes/genre')
const author = require('./routes/author')
const searchRegex = require('./routes/searchRegex')
const language = require('./routes/language')
const period = require('./routes/period')
const titles = require('./routes/titles')
const quote = require('./routes/quote')
const getByID = require('./getBookByID')

router.use('/search', search)
router.use('/genre', genre)
router.use('/author', author)
router.use('/searchRegex', searchRegex)
router.use('/language', language)
router.use('/period', period)
router.use('/titles', titles)
router.use('/quote', quote)
router.use('/id', getByID)

module.exports = router
