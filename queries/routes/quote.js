const fs = require('fs')
const router = require('express').Router()

function getRandom(arr){
    return arr[Math.floor(Math.random() * arr.length)]
}

router.get('/', (req, res) => {
    fs.readFile('./queries/routes/quotes/quotes.json','utf-8', (err, data) => {
        if (err){
            console.error(err.errno, err.code)
        }
        console.log(data)
        res.json(getRandom(JSON.parse(data)))
        return
    })
})

module.exports = router