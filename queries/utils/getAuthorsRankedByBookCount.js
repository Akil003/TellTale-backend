const connection = require('../../utils/connection')

const getAuthorsRankedByBookCount = async (numOfAuthors) => {
    const db = await connection()
    return db.collection('audiobooks').aggregate([
        {
            $match: {
                "authors.last_name": {
                    $not: {
                        $in: ["Various", "Anonymous", "Unknown"]
                    }
                }
            }
        },
        { $unwind : "$authors"},
        {
            $group : {
                _id : {
                    firstName : "$authors.first_name",
                    lastName : "$authors.last_name"
                },
                numOfBooks : { $sum : 1}
            }
        },
        { $sort : {"numOfBooks" : -1}}
    ]).limit(numOfAuthors).toArray()
}

// Testing
// (async() => {
//     console.log(await getAuthorsRankedByBookCount(40))
// })()

module.exports = getAuthorsRankedByBookCount