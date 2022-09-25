const next = require('next')
const express = require('express')

const DEV = process.env.NODE_ENV !== 'production'
const HOSTNAME = 'localhost'
const PORT = 3000

const app = next({
    dev: DEV,
    hostname: HOSTNAME,
    port: PORT
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.get('/api/hello-world', (req, res) => {
        res.json({ message: 'Hello world from Express!' })
    })

    // Resolve all other requests to Next.js
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Ready on http://${HOSTNAME}:${PORT}`)
    })
}).catch(ex => {
    console.error(ex.stack)
    process.exit(1)
})