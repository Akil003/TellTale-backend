const fs = require('fs')
const router = require('express').Router()
const path = require('path')

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

router.get('/', (req, res) => {

    fs.readdir('./queries/routes/banners', 'utf-8', (err, data) => {
        if (err) {
            console.error(err.errno, err.code)
        }
        console.log(data)

        const imgName = getRandom(data)
        res.sendFile(path.join(__dirname, './banners/' + imgName))

        return

    })
})

module.exports = router