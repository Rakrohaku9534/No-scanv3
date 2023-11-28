// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakchara = mufar.tebakchara ? mufar.tebakchara : {}
    let id = m.chat
    if (!(id in mufar.tebakchara)) throw false
    let json = mufar.tebakchara[id][1]
    mufar.reply(m.chat, '```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hcha$/i

handler.limit = true

export default handler