// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebaktebakan = mufar.tebaktebakan ? mufar.tebaktebakan : {}
    let id = m.chat
    if (!(id in mufar.tebaktebakan)) throw false
    let json = mufar.tebaktebakan[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hteb$/i

handler.limit = true

export default handler