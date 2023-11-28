// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakemoji = mufar.tebakemoji ? mufar.tebakemoji : {}
    let id = m.chat
    if (!(id in mufar.tebakemoji)) throw false
    let json = mufar.tebakemoji[id][1]
    mufar.reply(m.chat, '```' + (json.unicodeName).replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hemo$/i

handler.limit = true

export default handler