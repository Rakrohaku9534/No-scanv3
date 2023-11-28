// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebaksiapa = mufar.tebaksiapa ? mufar.tebaksiapa : {}
    let id = m.chat
    if (!(id in mufar.tebaksiapa)) throw false
    let json = mufar.tebaksiapa[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hsia$/i

handler.limit = true

export default handler