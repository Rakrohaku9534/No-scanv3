// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakbendera = mufar.tebakbendera ? mufar.tebakbendera : {}
    let id = m.chat
    if (!(id in mufar.tebakbendera)) throw false
    let json = mufar.tebakbendera[id][1]
    mufar.reply(m.chat, '```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hben$/i

handler.limit = true

export default handler