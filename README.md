# Death Note Telegram Bot

This is a Telegram bot that generates a "Death Note" style image with the name provided by the user. The bot supports both inline queries and standard bot interactions.

## Requirements

Before running the bot, make sure you have:

- Node.js (v16.x or higher)
- A Telegram Bot Token (which you can create via [BotFather](https://core.telegram.org/bots#botfather))
- An HTTPS server (required by Telegram's API)

## Installation

1. Clone the repository or download the project.

2. Install dependencies:

    ```bash
    npm install
    ```

3. **Create a `.env` file** in the root directory with the following content:

    ```env
    IMAGE_SERVER=your_server
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    ```

    - Replace `your_server` with the URL of your server (e.g., from ngrok).
    - Replace `your_telegram_bot_token` with your Telegram Bot Token from BotFather.

4. **Enable Inline Mode** for your bot in [BotFather](https://core.telegram.org/bots#botfather).

## Running Locally

You need to expose your local server over HTTPS to meet Telegram's requirements. You can use `ngrok` for this.

1. **Start ngrok:**

   Run the following command to expose your local server over HTTPS:

    ```bash
    ngrok http 3000
    ```

    This will provide an HTTPS URL like this:

    ```bash
    https://d8ac-84-54-71-3.ngrok-free.app
    ```

2. **Add the ngrok URL to the `.env` file:**

   - Add the `ngrok` URL to the `IMAGE_SERVER` variable in the `.env` file.
   - Example:

     ```env
     IMAGE_SERVER=https://d8ac-84-54-71-3.ngrok-free.app
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token
     ```

3. **Run the bot:**

   Now you can start both the server and the bot.

    ```bash
    node server.js
    node bot.js
    ```

   The bot should now be running and accessible via Telegram.

## Usage

- **Standard Bot Interaction:** Send a name to the bot, and it will generate an image with that name in the "Death Note" style.
- **Inline Mode:** You can use the bot inline by typing `@your_bot_username name`, and it will return the generated image inline.
