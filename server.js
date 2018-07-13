const express = require('express');
const socket = require('socket.io');
const app = express();

//Create the Server
var server = require('http').createServer(app);
var io = socket.listen(server);

//Start a server
server.listen(3500);
console.log("Server Started")

//Connection Array
var connections = [];

//Default Route
app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

//Socket.io Listener
io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets Connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length)
    });

    //Start or resume a video
    socket.on('start video socket', function(data){
        io.sockets.emit('start video', data);
    });

    //Stop a video
    socket.on('stop video socket', function(){
        io.sockets.emit('stop video');
    });

    //Change the Video
    socket.on('change video socket', function(data){
        io.sockets.emit('change video', data);
    });

    //Sync the diffrent users
    socket.on('sync video socket', function(vid, counter){
        io.sockets.emit('sync video', vid, counter);
    })
})