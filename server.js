const express = require("express");
const cors = require("cors");
const {
    dayInMilliseconds,
    updateStories,
    getStory,
} = require("./updateStories");

// App setup
const app = express();
app.use(cors({ methods: "GET", origin: "*" }));

// Get story data
updateStories();
setInterval(updateStories, dayInMilliseconds);

// GET random MSPFA story
app.get("/api/random", getStory);

// Start server
process.env.PORT = process.env.PORT || 3003;
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`);
});
