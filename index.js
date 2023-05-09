const axios = require("axios");
const TeleBot = require("telebot");
const bot = new TeleBot("6277352391:AAGDlFSiYznNUMZo08GDytgCNzkdxG3QtwQ");

bot.on("/start", (msg) => {
  return bot.sendMessage(msg.from.id, `Hello, ${msg.from.first_name}!`);
});
bot.on("/start", (msg) =>
  msg.reply.text(
    'Bot ini dibuat untuk tugas matakuliah kecerdasan buatan, bot ini bekerja dangan mengetikan "/kalimat_hari_ini", maka bot akan memberikan kaliam random untuk kalian'
  )
);

axios
  .get("https://candaan-api.vercel.app/api/text/random")
  .then((response) => {
    const data = response.data;
    bot.on("/kalimat_hari_ini", (msg) => msg.reply.text(data.data));
    bot.start();
  })
  .catch((error) => console.log(`Error: ${error.message}`));
