// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import { join } from 'path';
import { xpRange } from '../../lib/levelling.js';

const checkUser = (id, adminList) => {
  const admin = adminList.find((participant) => participant.id === id)?.admin;
  return admin === 'superadmin' ? 'Super Admin' : admin === 'admin' ? 'Admin' : 'Member';
};

const potongString = (str) => str.length <= 80 ? str : str.slice(0, 80);



let handler = async (m, { mufar, args, usedPrefix, command, groupMetadata }) => {
  const adminList = groupMetadata.participants; // Perbaikan ini!
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? mufar.user.jid : m.sender;
  let { exp, limit, level, role, money, lastclaim, lastweekly, registered, regTime, age, banned, pasangan } = global.db.data.users[who];
  let { min, xp, max } = xpRange(level, global.multiplier);
  let name = m.name.split("\n")[0];
  let pp = await mufar.profilePictureUrl(who, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
 // const pp = await mufar.profilePictureUrl(m.sender, "image").catch((_) => "./src/avatar_contact.png")
  if (typeof global.db.data.users[who] == "undefined") {
    global.db.data.users[who] = {
      exp: 0,
      limit: 10,
      lastclaim: 0,
      registered: false,
      name: mufar.getName(m.sender),
      age: -1,
      regTime: -1,
      afk: -1,
      afkReason: '',
      banned: false,
      level: 0,
      lastweekly: 0,
      role: 'Warrior V',
      autolevelup: false,
      money: 0,
      pasangan: "",
    };
  }
  let math = max - xp;
  let caption = `*YOUR PROFILE*
*🏷️ Nama:* *(${name})* ${registered ? '(' + name + ') ' : ''} ( @${who.split("@")[0]} )
*❤️ Pasangan:*  ${pasangan ? `@${pasangan.split("@")[0]}` : `Tidak Punya`}
*💲 Money:* *RP* ${money}
*🏆 Level* ${level}
*🎋 Role:* ${role}
*🧬 XP:* TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Siap untuk *${usedPrefix}levelup*` : `${math} XP lagi untuk levelup`}]
*📨 Terdaftar:* ${registered ? 'Ya (' + new Date(regTime).toLocaleString() + ')' : 'Tidak'} ${lastclaim > 0 ? '\n*⏱️Terakhir Klaim:* ' + new Date(lastclaim).toLocaleString() : ''}\n\n Ketik ${usedPrefix}inv untuk melihat Inventory RPG`;

  const contohStringPanjang = `Ini adalah profil dari ${name}, seorang ${checkUser(m.sender, adminList)} di ${groupMetadata.subject}.`; // Perbaikan ini!
  const hasilPotong = potongString(contohStringPanjang);
  const url = await mufar.profilePictureUrl(who, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  try {
    await mufar.sendFile(m.chat, pp, '', caption, m, null, { mentions: mufar.parseMention(caption) });
  } catch (e) {
    await mufar.sendFile(m.chat, 'https://telegra.ph/file/24fa902ead26340f3df2c.png', '', caption, m, null, { mentions: mufar.parseMention(caption) });
  }
}

handler.help = ['profile'].map(v => v + ' <url>');
handler.tags = ['rpg'];
handler.command = /^(pro(fil)?(file)?)$/i;
handler.group = true

export default handler;