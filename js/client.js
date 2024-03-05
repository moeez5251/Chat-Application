const socket = io('http://localhost:8000/');
const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")
var audio=new Audio('ting.mp3');
const append = (message, position) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messageContainer.append(messageelement);
    if(position=='left'){
        audio.play();
    }
}
const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', name);
if(name==""){
    const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', name);
}
form.addEventListener("submit", (e) => {
    e.preventDefault();//Does not  reload again and again

    const message = messageInp.value;

    append(`You: ${message}`, "right")

    socket.emit('send', message);

    messageInp.value = ""
})
socket.on('user-joined', name => {

    append(`${name}  joined the chat`, 'left')
})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    if(name!=""){

        append(`${name}: left the chat`, 'left')
    }
})


