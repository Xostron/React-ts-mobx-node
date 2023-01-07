const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json())
app.ws('/', (ws, req) => {

    console.log('ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО')
    // передаем на клиент
    // ws.send('server: connecting people')

    // читаем от клиента
    ws.on('message', (msg) => {
        const data = JSON.parse(msg)
        switch (data.method) {
            case 'connection':
                connectionHandler(ws, data)
                break
            case 'chat':
                broadcastConnectionChat(ws, data)
                break
            case 'draw':
                broadcastConnectionDraw(ws, data)
                break
            default:
                console.log('ошибка данных, method не распознан', data)
                break
        }
    })
})

app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace('data:image/png;base64,', '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
            data, 'base64')
        return res.status(200).json({ message: 'Загружено на сервер' })
    } catch (error) {
        console.log(error)
        return res.status(500).json('error')
    }
})

app.get('/image', (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = 'data:image/png;base64,' + file.toString('base64')
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json('error')
    }
})

app.listen(PORT, () => { console.log(`server started on PORT ${PORT}`) })

const connectionHandler = (ws, data) => {
    ws.id = data.id
    broadcastConnectionDraw(ws, data)
}

const broadcastConnectionDraw = (ws, data) => {
    aWss.clients.forEach(client => {
        if (client.id === data.id) {
            client.send(JSON.stringify(data))
        }
    })
}

const broadcastConnectionChat = (ws, data) => {

}