const axios = require("axios");
const { Bot, webhookCallback } = require("grammy");
const express = require("express");

require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) =>
  ctx.reply(
    'Bot ini dibuat untuk tugas matakuliah kecerdasan buatan, bot ini bekerja dangan mengetikan "/kalimat_hari_ini", maka bot akan memberikan kaliam random untuk kalian'
  )
);
bot.command("kalimat_hari_ini", (ctx) => {
  try {
    const response = axios.get(
      "https://candaan-api.vercel.app/api/text/random"
    );
    const kalimat = response.data.data;
    ctx.reply(kalimat);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    ctx.reply("Maaf, terjadi kesalahan pada server.");
  }
});

bot.on("message", (ctx) => {
  const { first_name, last_name, username } = ctx.from;
  const name =
    first_name +
    (last_name ? ` ${last_name}` : "") +
    (username ? ` (@${username})` : "");
  ctx.reply(
    `Hi ${name}, apa kamu mau mendapatkan kalimat random untuk hari ini? kamu bisa mengetikan "/kalimat_hari_ini" 😊`
  );
});

if (process.env.NODE_ENV === "production") {
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  bot.start();
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
