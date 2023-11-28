// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.susunkata = mufar.susunkata ? mufar.susunkata : {}
    let id = m.chat
    if (!(id in mufar.susunkata)) throw false
    let json = mufar.susunkata[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hsus$/i

handler.limit = true

export default handler