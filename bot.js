const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  // Save the user to a database or perform other operations
  res.status(201).json({ message: 'User created successfully', user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const noblox = require("noblox.js");

// Place IDs for the games
const placeIds = ["PET_SIMULATOR_X_PLACE_ID", "BROOKHAVEN_RP_PLACE_ID"]; // Replace Pet Simulator X and, Brookhaven RP game ID s

// Set up the bot
async function runBot() {
  try {
    // Log in to Roblox using the provided cookie
    await noblox.setCookie(process.env.cookie);
    console.log("Logged in to Roblox successfully.");

    // Join each game
    for (const placeId of placeIds) {
      await noblox.setPlaceId(placeId);
      console.log(`Joined game with place ID ${placeId}`);

      // Listen for chat messages
      noblox.onChatReceived((message) => {
        const content = message.content.toLowerCase();

        // Check if the message contains "hello" or "hi"
        if (content.includes("hello") || content.includes("hi")) {
          // Respond with "Hello There"
          noblox.sendChatMessage("Hello There");
        }
      });

      // Start listening for chat messages
      noblox.listenForChatMessages();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the bot
runBot(); // Do not delete this function
