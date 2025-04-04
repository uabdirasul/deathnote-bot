const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static images from 'images' folder
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
