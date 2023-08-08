const router = require('express').Router()
const connection = require('../utils/connection')

router.post('/', async (req, res) => {
    const [email, ebook] = req.body
    if (!email || !ebook) {
        return res.status(400).json({
            error: `No email or ebook provided`
        })
    }
    const db = await connection();
    const existingDocument = await db.collection('records').findOne({ _id: email });

    function send(msg){
        return res.status(200).json({
            message : msg
        })
    }

    if (existingDocument) {
        // Email exists, check if audiobook ID already exists
        const audiobookExists = existingDocument.audiobooks.some(item => item.id === audiobook.id);

        if (!audiobookExists) {
            // Audiobook ID doesn't exist, add it to the array
            await db.collection('records').updateOne(
                { _id: email },
                { $push: { audiobooks: audiobook } }
            );
            return send('Audiobook added to existing email');
        } else {
            return send('Audiobook ID already exists for this email');
        }
    } else {
        // Email doesn't exist, create a new document
        await db.collection('records').insertOne({
            _id: email,
            audiobooks: [audiobook]
        });
        return send('New email and audiobook added');
    }
})

module.exports = router