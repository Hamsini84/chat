const { Socket } = require('socket.io')

const io = require('socket.io')(3000,{
    cors:{
        origin:'*' ,
    }
})

const users = {}

io.on('connection',Socket => {
    Socket.on('new-user', name => {
        users[Socket.id] = name
        Socket.broadcast.emit('user-connected', name)
    })
    Socket.on('send-chat-message', message => {
        Socket.broadcast.emit('chat-message', { message: message, name: users[Socket.id] })
    })
    Socket.on('disconnected', () => {
        Socket.broadcast.emit('user-disconnected', users[Socket.id])
        delete users[Socket.id]  
    })
})