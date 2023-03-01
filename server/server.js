// import Socket from "socket.io";
const server = require("http").createServer();


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4KIAf78RfZqiJG885Dr5aLFwSM5BWo4g",
  authDomain: "server-app-hosting.firebaseapp.com",
  projectId: "server-app-hosting",
  storageBucket: "server-app-hosting.appspot.com",
  messagingSenderId: "855551181280",
  appId: "1:855551181280:web:8deb4c1536b54ef61dab85",
  measurementId: "G-64GYWP41PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("Utilisateur connecté");
  socket.on('channel',(data)=>{
    io.emit('message', data)
  })

});
server.listen(3001);
