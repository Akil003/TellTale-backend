const router = require('express').Router()

const getAuthorsRankedByBookCount = require('../utils/getAuthorsRankedByBookCount')
const getGenresRankedByBookCount = require('../utils/getGenresRankedByBookCount')
const getLanguagesRankedByBookCount = require('../utils/getLanguagesRankedByBookCount')

const NUM_OF_AUTHORS = 6
const NUM_OF_GENRES = 12
const NUM_OF_LANGUAGES = 3
const NUM_OF_PERIODS = 2

const getTitles = async function () {
    function getRandom(array, numOfObjRequired) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array.slice(0, numOfObjRequired)
    }

    const authors = getRandom([...await getAuthorsRankedByBookCount(NUM_OF_AUTHORS * 5)], NUM_OF_AUTHORS)
    const genres = getRandom([...await getGenresRankedByBookCount(NUM_OF_GENRES * 5)], NUM_OF_GENRES)
    const languages = getRandom([...await getLanguagesRankedByBookCount(NUM_OF_LANGUAGES * 5)], NUM_OF_LANGUAGES)

    const periods = getRandom([
            { from: 1800, to: 1900 },
            { from: 1900, to: 2000 },
            { from: 2000, to: 2100 }
        ], NUM_OF_PERIODS)
    

    return { authors, genres, languages, periods }
}

router.get('/', async (req, res) => {
    const titles = await getTitles()
    res.json(titles)
});


module.exports = router