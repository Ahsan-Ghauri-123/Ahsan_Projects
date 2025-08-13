// const socket = io('http://localhost:8000');

// const form =document.getElementById('Send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector('.container');

// const append=(message,position)=>{
//     const messageElement = document.createElement('div');
//     messageElement.innerHTML= message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append('messageElement');
// };

// const name = prompt('Enter your name to join');
// socket.emit('new-user-joined', name);

// socket.on('user-joined', name =>{
//     append(`${name} joined the chat`,'right')
// })

// const socket = io('http://localhost:8000');

// const form = document.getElementById('Send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector('.container');

// const append = (message, position) => {
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
// };

// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`You: ${message}`, 'right');
//     socket.emit('send', message);
//     messageInput.value= '';
// })

// const name = prompt('Enter your name to join');
// socket.emit('new-user-joined', name);

// socket.on('user-joined', name => {
//     append(`${name} joined the chat`,'right');
// });

// socket.on('receive', data => {
//     append(`${data.name} : ${data.message}`, 'left');
// });

const socket = io('http://localhost:8000');

const form = document.getElementById('Send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.wav');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(position === 'right' ? 'message-right' : 'message-left');
    messageContainer.append(messageElement);
    if(position === 'left'){
        audio.play();
    }
};

// // Initial messages (Harry & Ali) — append dynamically
// append('Harry: hello, how are you', 'right');
// append('Ali: hey I am good and what about you...', 'left');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    // Append join message AFTER existing messages
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'right');
});
