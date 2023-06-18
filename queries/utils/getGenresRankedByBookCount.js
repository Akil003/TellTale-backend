const connection = require('../../utils/connection')

const getGenresRankedByBookCount = async(numOfGenres) => {
    const db = await connection()
    return db.collection('audiobooks').aggregate([
        {
            $unwind : "$genres"
        },
        {
            $group: {
                _id : "$genres.name",
                numOfBooks : { $sum : 1 }
            }
        },
        { $sort : {numOfBooks : -1}}
    ]).limit(numOfGenres).toArray()
}


module.exports = getGenresRankedByBookCount