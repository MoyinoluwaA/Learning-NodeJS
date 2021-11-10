const http = require('http')
const port = 4000

const server = http.createServer((req, res) => {
    res.end('Hello NodeJS!')
})

server.listen(port, () => console.log(`Server running on port ${port}`))