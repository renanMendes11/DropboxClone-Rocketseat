const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect(
    "mongodb+srv://renan:renan@cluster0-uru9a.mongodb.net/test?retryWrites=true",
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require('./routes'));
server.listen(process.env.PORT ||  3333);



//concentando bd mysql
//const connection = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: 'root',
//    database: 'firstreactproject'
//})

//connection.connect(function(error){
//    (error)? console.log(error): console.log('conectou');
//})
//module.exports = connection;