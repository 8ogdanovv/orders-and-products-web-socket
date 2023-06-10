const WebSocket = require('ws');

// Create a WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 });

// Keep track of connected clients
const clients = new Set();

// Function to broadcast the instance count to all connected clients
function broadcastInstanceCount() {
  const instanceCount = clients.size;
  for (const client of clients) {
    client.send(instanceCount.toString());
  }
}

// WebSocket connection event handler
wss.on('connection', (ws) => {
  // Add the new client to the set
  clients.add(ws);

  // Send the initial instance count to the client
  ws.send(clients.size.toString());

  // WebSocket close event handler
  ws.on('close', () => {
    // Remove the client from the set
    clients.delete(ws);

    // Broadcast the updated instance count
    broadcastInstanceCount();
  });
});

// Start the server
console.log('WebSocket server is running on port 8080.');
