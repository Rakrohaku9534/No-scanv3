// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebaksurah = mufar.tebaksurah ? mufar.tebaksurah : {}
    let id = m.chat
    if (!(id in mufar.tebaksurah)) throw false
    let json = mufar.tebaksurah[id][1]
    mufar.reply(m.chat, '```' + json.surah.englishName.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hsur$/i

handler.limit = true

export default handler