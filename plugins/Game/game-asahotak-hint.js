// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

let handler = async (m, { mufar }) => {
    mufar.asahotak = mufar.asahotak ? mufar.asahotak : {}
    let id = m.chat
    if (!(id in mufar.asahotak)) throw false
    let json = mufar.asahotak[id][1]
    mufar.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hasa$/i

handler.limit = true

export default handler