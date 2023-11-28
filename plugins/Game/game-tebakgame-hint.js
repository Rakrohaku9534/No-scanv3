// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakgame = mufar.tebakgame ? mufar.tebakgame : {}
    let id = m.chat
    if (!(id in mufar.tebakgame)) throw false
    let json = mufar.tebakgame[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hgame$/i

handler.limit = true

export default handler