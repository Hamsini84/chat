const Socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('your name?')
appendMessage('you joined')
Socket.emit('new-user', name)

Socket.on('chat-message', data => {
    appendMessage(`${data.name} : ${data.message}`)
})

Socket.on('user-connected', name =>{
    appendMessage(`${name} connected`)
})

Socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})



messageForm.addEventListener('submit',e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`$you : ${message}`)
    Socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}