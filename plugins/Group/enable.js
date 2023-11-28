// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
 const features = ["antiBot", "antiFoto", "antiVideo", "antiAudio", "antiCall", "antiDelete", "antiLinkFb", "antiLinkHttp", "antiLinkIg", "antiLinkTel", "antiLinkTik", "antiLinkWa", "antiLinkYt", "antiMedia","antiNsfw", "antiSatir", "antiSticker", "antiVirtex", "antiToxic", "antibule", "autoBio", "autoChat", "autoAi", "autoGpt", "autoJoin", "autoPresence", "autoReply", "autoSticker", "autoVn", "viewStory", "bcjoin", "detect", "getmsg", "nsfw", "antiSpam", "simi", "alicia", "updateAnime", "viewonce", "welcome", "autoread", "gconly", "nyimak", "pconly", "self", "swonly", "lastAnime", "latestNews"];
  const activeFeatures = ["antiDelete", "detect", "getmsg", "lastAnime", "latestNews", "welcome"];
  const result = features.map((f, i) => {
    const isActive = activeFeatures.includes(f) ? !global.db.data.chats[m.chat][f] : global.db.data.chats[m.chat][f];
    return `\`\`\`${(i + 1).toString().padEnd(2)}.\`\`\` \`\`\`${f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).padEnd(18)}\`\`\` \`\`\`${isActive ? "ON" : "OFF"}\`\`\``;
  }).join('\n│ ');
const  featureStatus = `*# Feature*            *Mode*\n${"-".repeat(33)}\n╭━━━━━━━━┈─◂\n│ ${result}\n╰━━━━━━━━┈─◂`;
  const listEnab = `🛠️ *DAFTAR FITUR*

${featureStatus}

*📝 CARA MENGGUNAKAN:*
→ ${usedPrefix + command} [nomor atau nama fitur]`;

  let isEnable = !/false|disable|(turn)?off|0/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];

  // Ambil input dari args
  let input = args[0];
  
  // Cek apakah input adalah angka
  let isNumber = !isNaN(input);

  let featureName;

  if (isNumber) {
    let index = parseInt(input) - 1;

    if (index < 0 || index >= features.length) {
      return await mufar.reply(m.chat, listEnab, m);
    }

    featureName = features[index];
  } else {
    // Jika input bukan angka, gunakan itu sebagai nama fitur
    featureName = input;
  }

  // Periksa apakah featureName cocok dengan salah satu elemen dalam daftar fitur
  if (!features.includes(featureName)) {
    return await mufar.reply(m.chat, listEnab, m);
  }

  // ...
  
  if (activeFeatures.includes(featureName)) {
    chat[featureName] = !isEnable;
    mufar.reply(m.chat, `Feature *${featureName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON' : 'OFF'}*`, m);
  } else {
    if (["autoChat"].includes(featureName)) {
      mufar.autochat = mufar.autochat ? mufar.autochat : {}
      mufar.autochat.status = isEnable;
      mufar.reply(m.chat, `Feature *${featureName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON' : 'OFF'}*`, m);
    } else {
      chat[featureName] = isEnable;
      mufar.reply(m.chat, `Feature *${featureName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON' : 'OFF'}*`, m);
    }
  }
}
handler.help = ["en", "dis"].map(v => v + "able <nomor atau nama fitur>");
handler.tags = ["group", "owner"];
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i;

export default handler;