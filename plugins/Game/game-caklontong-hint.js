// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.caklontong = mufar.caklontong ? mufar.caklontong : {}
    let id = m.chat
    if (!(id in mufar.caklontong)) throw false
    let json = mufar.caklontong[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hcak$/i

handler.limit = true

export default handler