// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakkabupaten = mufar.tebakkabupaten ? mufar.tebakkabupaten : {}
    let id = m.chat
    if (!(id in mufar.tebakkabupaten)) throw false
    let json = mufar.tebakkabupaten[id][1]
    mufar.reply(m.chat, '```' + json.title.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hkab$/i

handler.limit = true

export default handler