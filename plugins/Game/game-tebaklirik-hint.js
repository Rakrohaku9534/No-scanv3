// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebaklirik = mufar.tebaklirik ? mufar.tebaklirik : {}
    let id = m.chat
    if (!(id in mufar.tebaklirik)) throw false
    let json = mufar.tebaklirik[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hlir$/i

handler.limit = true

export default handler