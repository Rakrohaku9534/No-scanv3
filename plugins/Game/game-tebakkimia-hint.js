// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakkimia = mufar.tebakkimia ? mufar.tebakkimia : {}
    let id = m.chat
    if (!(id in mufar.tebakkimia)) throw false
    let json = mufar.tebakkimia[id][1]
    mufar.reply(m.chat, '```' + json.unsur.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hkim$/i

handler.limit = true

export default handler