import express from "express";

// taking a specific module named "createServer" from http module
import { createServer } from "http";

// taking a "Server" module from socket.io module
import { Server } from "socket.io";

// taking a "fileURLToPath" module from url module and this module is use to give path
import { fileURLToPath } from "url";
import path from "path";

// these 2 lines are use to give the path of "public" folder of html file to node.js 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// give express > app as a argument to "createServer" module from http for socket.io
const server = createServer(app);

// prepared server of express passed as a argument to "io" of socket.io in the form of "new Server"
const io = new Server(server);


// giving the path of public folder to node.js
app.use(express.static(path.join(__dirname, "public")));


// sending the file of "index.html" to home page of route "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


// this allow all users OR clients to connect with server by socket.io , there is "socket" paramenter which have all information about clients i.e. message, id 
io.on("connection", (socket) => {
  console.log("a user is connected");

// parameter named "socket" containing all info about single client , in this getting message named of "message chat" by keyword "on" and this is stored in next parameter "msg"
  socket.on('message chat', (msg) => {
    console.log('message: ' + msg);

    // in thid step server send message to users by using keyword "emit" this message send by named "chat message" (in revenge of comming value) 
    io.emit('chat message', msg);
  });


// this can disconnect the user
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
});


// in this you can get more arguments send from users 
// io.on('connection', (socket) => {
//     socket.on('hello', (arg1, arg2, arg3) => {
//       console.log(arg1); // 1
//       console.log(arg2); // '2'
//       console.log(arg3); // { 3: '4', 5: <Buffer 06> }
//     });
//   });

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
