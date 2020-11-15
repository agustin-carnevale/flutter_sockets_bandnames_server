const { io } = require('../index');

//Sockets Messages
io.on('connection', client => {
    console.log("Client Connected")

    client.on('disconnect', ()=>{
        console.log("Client Disconnected");
    });

    client.on('message', data =>{ 
        console.log(data.name)
        io.emit('message', {message: "Mensaje enviado"})
    });
});
