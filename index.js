const express = require('express')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')
const compression = require('compression')

app.use(compression())

const cors = require('cors')

const query = require('./queries/index')

app.use(cors({
    origin: '*'

}))
app.use('/query', query)

app.post('/watched', )

app.use('/api/feed/audiobooks', createProxyMiddleware({
    target: 'https://librivox.org',
    changeOrigin: true,
}));

app.use('/metadata', createProxyMiddleware({
    target: 'https://archive.org/',
    changeOrigin: true,
}));


app.listen(8000, () => {
    console.log('listening...')
})