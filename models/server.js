const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io');
const cors      =require("cors");
const path      = require('path');
const Sockets   = require('./sockets');

class Server {

    constructor(){
         
        this.app = express();
        this.port = process.env.PORT;
        
        this.server = http.createServer (this.app);
        
        this.io = socketio( this.server , {});
    }

    middlewares () {
        this.app.use( express.static( path.resolve(__dirname, '../public')));
        this.app.use( cors());

    }

    socketsconfig () {

        new Sockets( this.io );

    }

    execute () {
        
        this.middlewares();

        this.socketsconfig();

        this.server.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }
}

module.exports = Server;