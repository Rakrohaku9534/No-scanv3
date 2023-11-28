// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakingambar = mufar.tebakingambar ? mufar.tebakingambar : {}
    let id = m.chat
    if (!(id in mufar.tebakingambar)) throw false
    let json = mufar.tebakingambar[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hgam$/i

handler.limit = true

export default handler