const http = require("http");

const app = require('./src/app');
const setupWebsocket = require('./src/sockets/signaling.socket');

// for database connection
// const connectDB = require('./config/db');
// const {startMongo, stopMongo} = require("./src/script/mongoDB_start");


const PORT = 3000;

async function startServer() {
  try {
    // Start local MongoDB (for dev)
    // await startMongo();

    // Connect MongoDB
    // await connectDB();

    // Create HTTP server
    const server = http.createServer(app);

    // Attach WebSocket
    setupWebsocket(server);

    // Start listening
    server.listen(PORT, () => {
      console.log(`Signaling server running on http://localhost:${PORT}`);
    });

    // Handle graceful shutdown
    // process.on('SIGINT', async () => {
    //   console.log("Server interrupted. Stopping MongoDB...");
    //   try { await stopMongo(); } catch (err) { console.error(err); }
    //   process.exit();
    // });

    // process.on('SIGTERM', async () => {
    //   console.log("Server terminated. Stopping MongoDB...");
    //   try { await stopMongo(); } catch (err) { console.error(err); }
    //   process.exit();
    // });

    // process.on('exit', async (code) => {
    //   console.log(`Process exiting with code ${code}. Stopping MongoDB...`);
    //   try { await stopMongo(); } catch (err) { console.error(err); }
    // });

  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

// Start everything
startServer();