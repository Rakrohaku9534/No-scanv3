// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.siapakahaku = mufar.siapakahaku ? mufar.siapakahaku : {}
    let id = m.chat
    if (!(id in mufar.siapakahaku)) throw false
    let json = mufar.siapakahaku[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hsi$/i

handler.limit = true

export default handler