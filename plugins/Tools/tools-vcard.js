// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar, args, text, usedPrefix, command }) => {
  if (!text) throw `⚠️ *_Sebutkan orang yang ingin Anda dapatkan vcard-nya._*\n*📌 Contoh penggunaan:* ${usedPrefix + command} @tag`
  
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? mufar.user.jid : m.sender
  let bio = await mufar.fetchStatus(who).catch(_ => 'undefined')
  let biot = bio.status?.toString() || 'Sin Información'
  let user = global.db.data.users[who]
  let name = await mufar.getName(who)
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nORG:${name}\nTITLE:\nitem1.TEL;waid=${who.split`@`[0]}:+${who.split`@`[0]}\nitem1.X-ABLabel:${name}\nX-WA-BIZ-DESCRIPTION:${biot}\nX-WA-BIZ-NAME:${name}\nEND:VCARD`
  
  mufar.sendMessage(m.chat, { contacts: { displayName: `${name}`, contacts: [{ vcard }] }}, { quoted: m, contextInfo: { externalAdReply: { showAdAttribution: true }}})
}

handler.help = ['vcard *@tag*']
handler.tags = ['tools']
handler.command = ['vcard']
handler.group = true

export default handler