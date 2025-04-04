require("dotenv").config();
const { Telegraf } = require("telegraf");
const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("Starting Death Note Bot...");

// Create an "images" folder if it doesn't exist
if (!fs.existsSync("./images")) fs.mkdirSync("./images");

// Function to generate Death Note image
const generateDeathNoteImage = async (name) => {
  const width = 736;
  const height = 1041;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Load Death Note background
  const background = await loadImage(path.join(__dirname, "deathnote.jpg"));
  ctx.drawImage(background, 0, 0, width, height);

  // Load custom font
  const fontPath = path.join(__dirname, "fonts", "deathnote.otf");
  const fontName = "DeathNoteFont";
  registerFont(fontPath, { family: fontName });

  // Text styling
  ctx.fillStyle = "white"; // White text
  ctx.font = `60px "${fontName}"`; // Custom font
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Shadow effect
  ctx.shadowColor = "black";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;

  // Draw text
  ctx.fillText(name, width / 2, height / 2);

  // Save the image
  const imagePath = `./images/deathnote_${Date.now()}.jpeg`;
  const out = fs.createWriteStream(imagePath);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);

  return new Promise((resolve) => {
    out.on("finish", () => resolve(imagePath));
  });
};

// Standard bot interaction
bot.on("text", async (ctx) => {
  const name = ctx.message.text;
  const imagePath = await generateDeathNoteImage(name);
  await ctx.replyWithPhoto(
    { source: imagePath },
    { caption: `The name of the human who is written in this note shall die.` }
  );
});

// Inline query handler
bot.on("inline_query", async (ctx) => {
  console.log("Received inline query:", ctx.inlineQuery);
  const query = ctx.inlineQuery.query;
  if (!query) return ctx.answerInlineQuery([]);

  const imagePath = await generateDeathNoteImage(query);
  const imageUrl = `${process.env.IMAGE_SERVER}/images/${path.basename(
    imagePath
  )}`;

  const results = [
    {
      type: "photo",
      id: String(Date.now()),
      photo_url: imageUrl,
      thumbnail_url: imageUrl,
      photo_width: 200,
      photo_height: 200,
      title: "Death Note",
      description: "Death Note image"
    }
  ];

  console.log(results);

  try {
    await ctx.answerInlineQuery(results);
    console.log("Inline query answered successfully");
  } catch (error) {
    console.error("Error answering inline query:", error);
  }

  const response = await ctx.answerInlineQuery(results, {
    cache_time: 0
  });
  console.log("Telegram API response:", response);
});

bot.launch();
console.log("Death Note Bot is running...");
