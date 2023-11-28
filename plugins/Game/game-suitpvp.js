// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja


let timeout = 60000;
let poin = 500;
let poin_lose = -100;
let handler = async (m, { mufar, usedPrefix }) => {
let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
  mufar.suit = mufar.suit ? mufar.suit : {};
  if (Object.values(mufar.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(m.sender))) throw "Selesaikan suit sebelumnya terlebih dahulu.";
  if (!who) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya.. Contoh\n\n${usedPrefix}suit @${mufar.user.jid.split('@')[0]}`, m.chat, { contextInfo: { mentionedJid: [mufar.user.jid] } });
  if (Object.values(mufar.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(who))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`;
  let id = "suit_" + (new Date() * 1);
  let caption = `
_*SUIT PvP*_

@${m.sender.split`@`[0]} menantang @${who.split`@`[0]} untuk bermain suit.

Silahkan @${who.split`@`[0]}.
\n\n`.trim();
  let footer = `Ketik "terima/ok/gas" untuk memulai suit\nKetik "tolak/gabisa/nanti" untuk menolak.`;
  mufar.suit[id] = {
    chat: await mufar.reply(m.chat, caption + footer, m, { mentions: [m.sender, ...mufar.parseMention(caption)] }),
    id: id,
    p: m.sender,
    p2: who,
    status: "wait",
    waktu: setTimeout(() => {
      if (mufar.suit[id]) mufar.reply(m.chat, `_Waktu suit habis_`, m);
      delete mufar.suit[id];
    }, timeout),
    poin,
    poin_lose,
    timeout
  };
};
handler.tags = ["game"];
handler.help = ["suitpvp", "suit"].map(v => v + " @tag");
handler.command = /^suit(pvp)?$/i;
handler.group = true;

export default handler;