const socket = io('https://xheikhchat.netlify.app/');
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
const left = (message) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('leftchat');
    messageContainer.append(messageelement);
    audio.play();
  
}
const join = (message) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('joinchat');
    messageContainer.append(messageelement);
    audio.play();
  
}
for (let i = 0; i < 2; ) {
    
    const name = prompt("Enter Your Name to Join");
    socket.emit('new-user-joined', name);
    if(name!=""){
      break;
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault();//Does not  reload again and again

    const message = messageInp.value;

    append(`You: ${message}`, "right")

    socket.emit('send', message);

    messageInp.value = ""
})
socket.on('user-joined', name => {
        if(name!=null&name!=""){

            join(`${name}  joined the chat`, 'left')
        }
})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    if(name!=null&name!=""){

        left(`${name}: left the chat`)
    }
})


