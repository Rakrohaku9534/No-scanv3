// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let handler = async(m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let url = await mufar.profilePictureUrl(who, 'image')
    await mufar.sendFile(m.chat, url, 'profile.jpg', `@${who.split`@`[0]}`, m, null, { mentions: [who]})
}
handler.command = /^(get(pp|profile))$/i
handler.help = ['getprofile [@users]']
handler.tags = ['tools']
export default handler