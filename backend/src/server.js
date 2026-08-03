import app from './app.js';

const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`✅ Production cluster listening on port [${PORT}]`);
});

// Tripwire: Catch if the Node process exits
process.on('exit', (code) => {
  console.log(`\n🛑 TRIPWIRE: Node process exited with code: ${code}`);
});

// 💓 THE HEARTBEAT: This forces the event loop to stay awake forever
setInterval(() => {
  console.log("💓 Heartbeat: Server is still alive...");
}, 2000);