// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakanjime = mufar.tebakanjime ? mufar.tebakanjime : {}
    let id = m.chat
    if (!(id in mufar.tebakanjime)) throw false
    let json = mufar.tebakanjime[id][1]
    mufar.reply(m.chat, '```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hani$/i

handler.limit = true

export default handler