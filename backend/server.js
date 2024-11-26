const express = require("express");
const app = express();
const dotenv = require("dotenv");
const router = require("./routes/user.routes");
const maprouter = require("./routes/mappingroutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbconnect = require("./connections/moongose");
const loginmodel=require('./model/userlogin')

const http = require("http");
const { Server } = require("socket.io"); // Correct import

dotenv.config(); // Load environment variables

// Create an HTTP server and attach Express
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for testing
    },
});

// Handle Socket.IO connections
io.on("connect", (client) => {
    console.log("A client connected:", client.id);
    client.on("user",(data,bus)=>{
        console.log(data.latitude)
        console.log(data.longitude)
        console.log(bus.busno)
        
    })
});

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        credentials: true, // Allow cookies and credentials
    })
);

// Connect to the database
dbconnect();

// Load routes
app.use(router);
app.use(maprouter);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
