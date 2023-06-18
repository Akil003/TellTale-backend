const connection = require('../../utils/connection')

const getLanguagesRankedByBookCount = async(numOfLanguages) => {
    const db = await connection()
    return db.collection('audiobooks').aggregate([
        {
            $match : {
                language : {
                    $ne : "English"
                }
            }
        },
        {
            $group: {
                _id : "$language",
                numOfBooks : { $sum : 1 }
            }
        },
        { $sort : {numOfBooks : -1}}
    ]).limit(numOfLanguages).toArray()
}

// Testing
// (async()=>{
//     console.log(await getLanguagesRankedByBookCount(40))
// })()

module.exports = getLanguagesRankedByBookCount