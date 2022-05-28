import { ICommand } from "@constants/command.constant";
import axios from "axios";

export default {
  aliases: ["nekoo", "cat", "kucing"],
  description: "Random cat man drawing (neko)",
  category: "weeaboo",
  consume: 1,
  callback: async ({ msg, client, shortMessage }) => {
    try {
      const { data } = await axios(`https://nekos.life/api/v2/img/neko`);
      client.sendMessage(msg.from, { image: { url: data.url }, caption: "🐱" });
    } catch (error) {
      console.log(error);
      return msg.reply(shortMessage.error.server);
    }
  },
} as ICommand;
