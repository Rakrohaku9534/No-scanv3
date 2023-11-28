// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.tebakkalimat = mufar.tebakkalimat ? mufar.tebakkalimat : {}
    let id = m.chat
    if (!(id in mufar.tebakkalimat)) throw false
    let json = mufar.tebakkalimat[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hkal$/i

handler.limit = true

export default handler