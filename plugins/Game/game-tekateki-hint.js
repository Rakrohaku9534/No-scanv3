// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tekateki = mufar.tekateki ? mufar.tekateki : {}
    let id = m.chat
    if (!(id in mufar.tekateki)) throw false
    let json = mufar.tekateki[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^htek$/i

handler.limit = true

export default handler