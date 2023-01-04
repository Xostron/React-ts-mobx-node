const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {

    console.log('ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО')
    // передаем на клиент
    ws.send('server: connecting people')

    // читаем от клиента
    ws.on('message', (msg) => {
        const data = JSON.parse(msg)
        switch (data.method) {
            case 'connection':
                connectionHandler(ws, data)
                break
            case 'message':
                connectionHandler(ws, data)
                break
            default:
                console.log('ошибка данных, method не распознан', data)
                break
        }

    })

})

app.listen(PORT, () => { console.log(`server started on PORT ${PORT}`) })

const connectionHandler = (ws, data) => {
    ws.id = data.id
    broadcastConnection(ws, data)
}

const broadcastConnection = (ws, data) => {
    aWss.clients.forEach(client => {
        if (client.id === data.id) {
            client.send(`пользователь ${data.username} подключен`)
        }
    })
}