// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakkata = mufar.tebakkata ? mufar.tebakkata : {}
    let id = m.chat
    if (!(id in mufar.tebakkata)) throw false
    let json = mufar.tebakkata[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hkat$/i

handler.limit = true

export default handler