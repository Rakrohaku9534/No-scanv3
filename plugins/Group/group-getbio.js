// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar, text, command }) => {
  try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.quoted.sender ? m.quoted.sender : m.sender
    let bio = await mufar.fetchStatus(who)
    m.reply(bio.status)
  } catch {
    if (text) throw `Bio Is Private!`
    else try {
      let who = m.quoted ? m.quoted.sender : m.sender
      let bio = await mufar.fetchStatus(who)
      m.reply(bio.status)
    } catch {
      throw `Bio Is Private!`
    }
  }
}
handler.help = ['getbio'].map(v => v + ' <@tag / reply>')
handler.tags = ['group']
handler.command = /^(getb?io)$/i
export default handler