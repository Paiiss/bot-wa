import userSchema from "@schema/user.schema";

export const findUser = async (sender: string) => {
  // if (!sender.match(/@s.whatsapp.net/)) return null;
  let data = await userSchema.findOne({ sender });
  if (!data) data = await userSchema.create({ sender: sender });
  return data;
};

const getNeededXP = (level) => level * level * 100;
export const updateUser = async ({ client, sender, limit, xpToAdd, msg }) => {
  try {
    const result = await userSchema.findOneAndUpdate({ sender: sender }, { sender: sender, $inc: { exp: xpToAdd, tReq: +1, limit: +limit } }, { upsert: true, new: true });
    let { exp, level } = result;
    const needed = getNeededXP(level);
    if (exp >= needed) {
      ++level;
      exp -= needed;
      await userSchema.updateOne({ sender: sender }, { level, exp });
      msg.reply(`@${sender.split("@")[0]} Congratulations you leveled up 🥳, now level ${level}`);
      // await client.sendMessage(sender, { text: `@${sender.split("@")[0]} Congratulations you leveled up 🥳, now level ${level}`, mentions: [sender] }, { quoted: msg });
    }
  } catch (e) {
    console.log(e);
  }
};

export const blockUser = async (sender: string, is: boolean) => {
  try {
    let data = await userSchema.findOne({ sender });
    if (!data) data = await userSchema.create({ sender: sender });
    data["isBan"] = is;
    data.save();
    return data;
  } catch (e) {
    console.log(e);
  }
};

// 120363040151521538@​g.us

export const getAll = async () => {
  try {
    return userSchema.find();
  } catch (e) {
    console.log(e);
  }
};

export const resetAllLimit = async () => {
  try {
    return userSchema.updateMany({ limit: 0 });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const reducemoney = async (id: string, total: number) =>
  new Promise(async (resolve, reject) => {
    let User = await findUser(id);
    if (User === null) return reject(`Invalid id/sender`);
    if (total === (0 || null)) return reject(`Server error: Number cannot be 0`);
    if (User.cash < total) return reject(`MONEY_LESS`);
    let data = await userSchema.findOneAndUpdate({ sender: User.sender }, { $inc: { cash: -total } });
    return resolve(data);
  });
