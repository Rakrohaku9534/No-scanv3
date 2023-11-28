// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakhewan = mufar.tebakhewan ? mufar.tebakhewan : {}
    let id = m.chat
    if (!(id in mufar.tebakhewan)) throw false
    let json = mufar.tebakhewan[id][1]
    mufar.reply(m.chat, '```' + json.title.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hhew$/i

handler.limit = true

export default handler