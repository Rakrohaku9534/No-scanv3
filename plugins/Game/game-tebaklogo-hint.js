// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebaklogo = mufar.tebaklogo ? mufar.tebaklogo : {}
    let id = m.chat
    if (!(id in mufar.tebaklogo)) throw false
    let json = mufar.tebaklogo[id][1]
    mufar.reply(m.chat, '```' + json.hasil.data.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hlog$/i

handler.limit = true

export default handler