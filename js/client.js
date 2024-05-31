// client.js
const socket = io('https://xheikhchat.netlify.app', {
    transports: ['websocket', 'polling']
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messageContainer.append(messageElement);
    if (position === 'left') {
        audio.play();
    }
};

const left = (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('leftchat');
    messageContainer.append(messageElement);
    audio.play();
};

const join = (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('joinchat');
    messageContainer.append(messageElement);
    audio.play();
};

for (let i = 0; i < 2;) {
    const name = prompt("Enter Your Name to Join");
    socket.emit('new-user-joined', name);
    if (name !== "") {
        break;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Does not reload again and again

    const message = messageInp.value;
    append(`You: ${message}`, "right");
    socket.emit('send', message);
    messageInp.value = "";
});

socket.on('user-joined', (name) => {
    if (name) {
        join(`${name} joined the chat`);
    }
});

socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', (name) => {
    if (name) {
        left(`${name} left the chat`);
    }
});
